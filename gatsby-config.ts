import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
    siteMetadata: {
        title: "Elvis's blogs",
        author: 'Elvis',
        description: "Personal blog by Elvis. Hello, I'm Elvis, a front-end engineer, this is my personal blogs",
        siteUrl: 'https://www.l123wx.site',
        social: {
            GitHub: 'https://github.com/l123wx',
            Email: 'mailto:llwxi@qq.com'
        }
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/pages`,
                name: 'pages'
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/issues`,
                name: 'issues'
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 630
                        }
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`
                        }
                    },
                    'gatsby-remark-autolink-headers',
                    'gatsby-remark-vscode-shiki',
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-smartypants',
                    {
                        resolve: 'gatsby-remark-external-links',
                        options: {
                            target: '_blank'
                        }
                    }
                ]
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Elvis's blogs`,
                short_name: `Elvis's blogs`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#ffffff`,
                display: `minimal-ui`,
                icon: `src/images/icon.png`,
                theme_color_in_head: false
            }
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography'
            }
        },
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-sitemap`
    ],
    pathPrefix: '/',
    graphqlTypegen: true
}

module.exports = config
