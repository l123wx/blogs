import { graphql, PageProps } from 'gatsby'

import Bio from '../components/Bio'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import React from 'react'
import Seo from '../components/SEO'
import ArticleItem from '../components/ArticleItem'
import { rhythm } from '../utils/typography'

const BlogIndexTemplate: React.FC<PageProps<QueryData>> = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
        <Layout location={location} title={siteTitle || ''}>
            <Seo />
            <aside
                style={{
                    marginBottom: rhythm(3)
                }}
            >
                <Bio />
            </aside>
            <main>
                {posts && posts.map(({ node }) => {
                    const title = node.frontmatter?.title || node.fields?.slug || ''
                    return (
                        <ArticleItem
                            key={node.id}
                            slug={node.fields?.slug || ''}
                            title={title}
                            spoiler={node.frontmatter?.spoiler || ''}
                            date={node.frontmatter?.date || ''}
                            timeToRead={node.timeToRead || 0}
                        />
                    )
                })}
            </main>
            <Footer />
        </Layout>
    )
}

export default BlogIndexTemplate

type QueryData = {
    site: {
        siteMetadata: Queries.SiteSiteMetadata
    }
    allMarkdownRemark: Queries.MarkdownRemarkConnection
}

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
            filter: { fileAbsolutePath: { regex: "/(/index.md)$/" } }
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
