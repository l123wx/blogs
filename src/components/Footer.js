import React from 'react'

import { rhythm } from '../utils/typography'
import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query {
    site {
      siteMetadata {
        social {
          github
        }
      }
    }
  }
`

const Footer = () => {
  const data = useStaticQuery(query)
  const linkList = Object.entries(data.site.siteMetadata.social).map(item => ({
    label: item[0],
    url: item[1]
  }))

  return (
    <footer
      style={{
        marginTop: rhythm(2.5),
        paddingTop: rhythm(1),
      }}
    >
      {linkList.reduce((pre, item, index) => {
        if (index !== 0) {
          pre.push(<span key={'point' + index}>&nbsp;&bull;&nbsp;</span>)
        }
        pre.push(
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            {item.label}
          </a>
        )
        return pre
      }, [])}
    </footer>
  )
}

export default Footer