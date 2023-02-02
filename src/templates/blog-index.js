import { graphql } from 'gatsby'

import Bio from '../components/Bio'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import React from 'react'
import Seo from '../components/SEO'
import ArticleItem from '../components/ArticleItem'
import get from 'lodash/get'
import { rhythm } from '../utils/typography'

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Seo />
        <aside
          style={{
            marginBottom: rhythm(2)
          }}
        >
          <Bio />
        </aside>
        <main>
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            return (
              <ArticleItem
                key={node.id}
                slug={node.fields.slug}
                title={title}
                spoiler={node.frontmatter.spoiler}
                date={node.frontmatter.date}
                timeToRead={node.timeToRead}
              />
            )
          })}
        </main>
        <Footer />
      </Layout>
    )
  }
}

export default BlogIndexTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: {date: DESC}}
      filter: {fileAbsolutePath: {regex: "/(/index.md)$/"}}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
          }
        }
      }
    }
  }
`
