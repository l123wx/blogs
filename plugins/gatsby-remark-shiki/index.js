const shiki = require('shiki')
const visit = require('unist-util-visit')

/**
 * 2 steps:
 *
 * 1. convert attrs into line numbers:
 *    {4,7-13,16,23-27,40} -> [4,7,8,9,10,11,12,13,16,23,24,25,26,27,40]
 * 2. convert line numbers into line options:
 *    [{ line: number, classes: string[] }]
 */
const attrsToLines = (attrs) => {
    attrs = attrs.replace(/^(?:\[.*?\])?.*?([\d,-]+).*/, '$1').trim()
    const result = []
    if (!attrs) {
        return []
    }
    attrs
        .split(',')
        .map(v => v.split('-').map(v => parseInt(v, 10)))
        .forEach(([start, end]) => {
            if (start && end) {
                result.push(...Array.from({ length: end - start + 1 }, (_, i) => start + i))
            } else {
                result.push(start)
            }
        })
    return result.map(v => ({
        line: v,
        classes: ['gatsby-highlight-code-line']
    }))
}

module.exports = async ({ markdownAST }, pluginOptions) => {
    const { theme } = pluginOptions

    const highlighter = await shiki.getHighlighter({
        theme: theme || 'dark-plus'
    })

    visit(markdownAST, 'code', node => {
        const arr = [node.lang, node.meta].join('')
        const lang = arr.split('{')[0] || ''
        const lines = arr.match(/\{.+?\}/)?.[0] || ''
        const tokens = highlighter.codeToThemedTokens(node.value, lang)
        const className = `language-${lang}`

        const highLightCode = shiki.renderToHtml(tokens, {
            lineOptions: attrsToLines(lines),
            elements: {
                pre: ({ children }) => {
                    return children
                },
                code: ({ children }) => {
                    // 这里如果不使用字符串拼接，而使用模板字符串的话，会导致代码第一行缩进有问题
                    return (
                        '<div class="gatsby-highlight" data-language="' +
                        lang +
                        '"><pre class="' +
                        className +
                        '"><code class="' +
                        className +
                        '">' +
                        children +
                        '</code></pre></div>'
                    )
                }
            }
        })
        // @ts-ignore
        node.type = 'html'
        node.value = highLightCode
    })
    // Manipulate AST
    return markdownAST
}