import React, { useEffect, useState } from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import '../fonts/fonts-post.css'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import Seo from '../components/SEO'
import ArticleNav from '../components/ArticleNav'
import ArticleContent from '../components/ArticleContent'
import { formatPostDate, formatReadingTime } from '../utils/helpers'
import { rhythm, scale } from '../utils/typography'

const BlogPostTemplate = (props) => {
    const post = props.data.markdownRemark
    const headings = post.headings
    const siteTitle = get(props, 'data.site.siteMetadata.title')
    const hash = window.location.hash
    const [activeArticleTagId, setActiveArticleTagId] = useState(null)
    let {
        previous,
        next
    } = props.pageContext

    useEffect(() => {
        setActiveArticleTagId(hash ? decodeURI(hash).split('#')[1] : null)
    }, [hash])

    return (
        <Layout location={props.location} title={siteTitle}>
            <Seo
                title={post.frontmatter.title}
                description={post.frontmatter.spoiler}
                slug={post.fields.slug}
            />
            {typeof window !== `undefined` &&
                <ArticleNav
                    headings={headings}
                    activeArticleTagId={activeArticleTagId}
                />
            }
            <main>
                <article>
                    <header style={{ marginBottom: rhythm(1) }}>
                        {post.frontmatter.title &&
                            <h1 style={{
                                color: 'var(--main)',
                                paddingTop: 0,
                                paddingBottom: rhythm(1 / 4)
                            }}>
                                {post.frontmatter.title}
                            </h1>
                        }
                        <p
                            style={{
                                ...scale(-1 / 5),
                                display: 'block',
                                marginBottom: 0
                            }}
                        >
                            {formatPostDate(post.frontmatter.date)}
                            {` • ${formatReadingTime(post.timeToRead)}`}
                        </p>
                    </header>
                    <ArticleContent
                        html={post.html}
                        onActiveArticleTagChange={(_activeArticleTagId) => {
                            setActiveArticleTagId(_activeArticleTagId)
                        }}
                    />
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
                                marginTop: '3.5rem'
                            }}
                        >
                            <li>
                                {previous && (
                                    <Link
                                        to={'/' + previous.fields.slug}
                                        rel="prev"
                                        style={{ marginRight: 20 }}
                                    >
                                        ← {previous.frontmatter.title}
                                    </Link>
                                )}
                            </li>
                            <li>
                                {next && (
                                    <Link
                                        to={'/' + next.fields.slug}
                                        rel="next"
                                    >
                                        {next.frontmatter.title} →
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                )}
            </aside>
        </Layout >
    )
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
      headings {
        id
        value
        depth
      }
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
