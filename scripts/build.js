const fs = require('node:fs')
const process = require('process')
const path = require('path')
const { rimrafSync } = require('rimraf')
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
            'Authorization': `Bearer ${args.githubToken}`
        }
    })
    const result = await response.json()

    const issuesDirPath = path.join(cwd, 'issues')

    initFolder(issuesDirPath)

    result.forEach(issue => {
        const folderName = `issue-${issue.number}`
        fs.mkdirSync(path.join(issuesDirPath, folderName))
        fs.writeFileSync(path.join(issuesDirPath, folderName, 'index.md'), createFrontMatter(issue.title, issue.created_at) + issue.body)
    })

    shell.exec('gatsby build')

    rimrafSync(issuesDirPath)
}

const initFolder = (path) => {
    if (fs.existsSync(path)) {
        rimrafSync(path)
    }

    fs.mkdirSync(path)
}

const createFrontMatter = (title = '', createDate = '', spoiler = '') => {
    return `---\r\ntitle: '${title}'\r\ndate: '${createDate}'\r\nspoiler: '${spoiler}'\r\n---\r\n\r\n`
}

yargs(hideBin(process.argv)).command('*', '', args => args.help(), run).argv
