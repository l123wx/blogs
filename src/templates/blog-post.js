import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import '../fonts/fonts-post.css'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import Seo from '../components/SEO'
import { formatPostDate, formatReadingTime } from '../utils/helpers'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')
        let {
            previous,
            next
        } = this.props.pageContext

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <Seo
                    title={post.frontmatter.title}
                    description={post.frontmatter.spoiler}
                    slug={post.fields.slug}
                />
                <main>
                    <article>
                        <header>
                            <h1 style={{ color: 'var(--main)' }}>
                                {post.frontmatter.title}
                            </h1>
                            <p
                                style={{
                                    ...scale(-1 / 5),
                                    display: 'block',
                                    marginBottom: rhythm(1),
                                    marginTop: rhythm(-4 / 5),
                                }}
                            >
                                {formatPostDate(post.frontmatter.date)}
                                {` • ${formatReadingTime(post.timeToRead)}`}
                            </p>
                        </header>
                        <div dangerouslySetInnerHTML={{ __html: post.html }} />
                    </article>
                </main>
                <aside
                    style={{
                        marginTop: rhythm(2)
                    }}
                >
                    <h3
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            marginTop: rhythm(0.25),
                        }}
                    >
                        <Link
                            style={{
                                boxShadow: 'none',
                                textDecoration: 'none',
                                color: 'var(--main)',
                            }}
                            to={'/'}
                        >
                            {siteTitle}
                        </Link>
                    </h3>
                    <Bio />
                    {(previous || next) && (
                        <nav>
                            <ul
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    listStyle: 'none',
                                    padding: 0,
                                }}
                            >
                                <li>
                                    {previous && (
                                        <Link
                                            to={previous.fields.slug}
                                            rel="prev"
                                            style={{ marginRight: 20 }}
                                        >
                                            ← {previous.frontmatter.title}
                                        </Link>
                                    )}
                                </li>
                                <li>
                                    {next && (
                                        <Link to={next.fields.slug} rel="next">
                                            {next.frontmatter.title} →
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    )}
                </aside>
            </Layout>
        )
    }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
      }
      fields {
        slug
      }
    }
  }
`
