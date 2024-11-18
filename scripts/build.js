const fs = require('node:fs')
const process = require('process')
const path = require('path')
const shell = require('shelljs');
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

const cwd = process.cwd()

const run = async (args) => {
    if (!args.githubToken) {
        console.error('Please set github access token by --github-token=<your token>')
        process.exit(1)
    }

    const response = await fetch('https://api.github.com/repos/l123wx/Notion/issues?labels=blog', {
        headers: {
            'Authorization': `Bearer ${args.githubToken}`,
            'Accept': 'application/vnd.github.full+json'
        }
    })
    const result = await response.json()

    const issuesDirPath = path.join(cwd, 'issues')

    initFolder(issuesDirPath)

    for (const issue of result) {
        const folderName = `issue-${issue.number}`
        const folderPath = path.join(issuesDirPath, folderName)
        fs.mkdirSync(folderPath)
        fs.writeFileSync(
            path.join(issuesDirPath, folderName, 'index.md'),
            createFrontMatter(issue.title, issue.created_at) + await contentFilter(issue.body, issue.body_html, folderPath))
    }

    shell.exec('gatsby build')

    shell.rm('-rf', issuesDirPath)

    process.exit(0)
}

const initFolder = (path) => {
    if (fs.existsSync(path)) {
        shell.rm('-rf', path)
    }

    fs.mkdirSync(path)
}

const createFrontMatter = (title = '', createDate = '', spoiler = '') => {
    return `---\r\ntitle: '${title}'\r\ndate: '${createDate}'\r\nspoiler: '${spoiler}'\r\n---\r\n\r\n`
}

const contentFilter = async (body_markdown, body_html, pwd) => {
    // 创建 assets 目录
    const assetsDir = path.join(pwd, 'assets');
    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
    }

    // 从 HTML 中提取所有图片链接
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const imgUrls = [];
    let match;
    
    while ((match = imgRegex.exec(body_html)) !== null) {
        imgUrls.push(match[1]);
    }
    
    // 下载并保存图片，同时记录新的本地路径
    const localImgPaths = await Promise.all(imgUrls.map(async url => {
        try {
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            const filename = path.basename(new URL(url).pathname);
            const localPath = path.join(assetsDir, filename);
            
            fs.writeFileSync(localPath, Buffer.from(buffer));
            return `./assets/${filename}`;
        } catch (error) {
            console.error(`Failed to download image: ${url}`, error);
            return url; // 如果下载失败，保留原始URL
        }
    }));
    
    // 替换 markdown 中的图片链接
    let index = 0;
    const updatedMarkdown = body_markdown.replace(
        /!\[image\]\([^)]+\)/g,
        () => {
            const newPath = localImgPaths[index];
            index++;
            return `![image](${newPath})`;
        }
    );
    
    return updatedMarkdown;
}

yargs(hideBin(process.argv)).command('*', '', args => args.help(), run).argv
