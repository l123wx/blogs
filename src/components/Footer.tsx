import React from 'react'

import { rhythm } from '../utils/typography'
import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
    query {
        site {
            siteMetadata {
                social {
                    GitHub
                }
            }
        }
    }
`

const Footer: React.FC = () => {
    const data = useStaticQuery(query)
    const linkList = Object.entries(data.site.siteMetadata.social).map(item => ({
        label: item[0],
        url: item[1]
    }))

    return (
        <footer
            style={{
                marginTop: rhythm(2.5),
                paddingTop: rhythm(1)
            }}
        >
            {/* 查看key warning的问题是否还存在 */}
            {linkList.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        {index !== 0 && <span key={'point' + index}>&nbsp;&bull;&nbsp;</span>}
                        <a
                            href={item.url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                        >
                            {item.label}
                        </a>
                    </React.Fragment>
                )
            })}
        </footer>
    )
}

export default Footer