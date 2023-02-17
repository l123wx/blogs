import React from 'react'
import { Analytics } from '@vercel/analytics/react'

type Props = {
    htmlAttributes: JSX.IntrinsicElements["html"]
    bodyAttributes: JSX.IntrinsicElements["body"]
    headComponents: React.ReactNode[]
    preBodyComponents: React.ReactNode[]
    body: string
    postBodyComponents: React.ReactNode[]
}

const HTML: React.FC<Props> = ({
    htmlAttributes,
    headComponents,
    bodyAttributes,
    preBodyComponents,
    postBodyComponents,
    body
}) => {
    return (
        <html {...htmlAttributes} >
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <Analytics />
                {headComponents}
            </head>
            <body {...bodyAttributes} className="light" >
                <script
                    dangerouslySetInnerHTML={
                        {
                            __html: `
                                (function() {
                                    window.__onThemeChange = function() {}
                                    function setTheme(newTheme) {
                                        window.__theme = newTheme
                                        preferredTheme = newTheme
                                        document.body.className = newTheme
                                        window.__onThemeChange(newTheme)
                                    }

                                    var preferredTheme
                                    try {
                                        preferredTheme = localStorage.getItem('theme')
                                    } catch (err) { }

                                    window.__setPreferredTheme = function(newTheme) {
                                        setTheme(newTheme)
                                        try {
                                            localStorage.setItem('theme', newTheme)
                                        } catch (err) {}
                                    }

                                    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
                                    darkQuery.addListener(function(e) {
                                        window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                                    })

                                    setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
                                })()
                            `
                        }
                    }
                />
                {preBodyComponents}
                <div
                    key={`body`}
                    id="___gatsby"
                    dangerouslySetInnerHTML={{ __html: body }
                    }
                />
                {postBodyComponents}
            </body>
        </html>
    )
}

export default HTML
