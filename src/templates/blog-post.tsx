import React, { useEffect, useState } from 'react'
import { Link, graphql, PageProps } from 'gatsby'
import get from 'lodash/get'
import '../fonts/fonts-post.css'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import Seo from '../components/SEO'
import ArticleNav from '../components/ArticleNav'
import ArticleContent from '../components/ArticleContent'
import GiscusComments from '../components/GiscusComments'
import { formatPostDate, formatReadingTime } from '../utils/helpers'
import { rhythm, scale } from '../utils/typography'
import { isBrowser } from '../utils/helpers'
import { BlogPostProps } from '../../gatsby-node'

const BlogPostTemplate: React.FC<PageProps<QueryData, BlogPostProps>> = props => {
    const post = props.data.markdownRemark
    const headings = post.headings?.filter(item => item !== null) as
        | Queries.MarkdownHeading[]
        | undefined
    const siteTitle = get(props, 'data.site.siteMetadata.title')
    const hash = isBrowser && window.location.hash
    const [activeArticleTagId, setActiveArticleTagId] = useState<ActiveArticleTagId>(null)
    let { previous, next } = props.pageContext

    const [theme, setTheme] = useState<ThemeType>(null)

    useEffect(() => {
        setTheme(window.__theme)
        window.__onThemeChange = newTheme => {
            setTheme(newTheme)
        }
    }, [])

    useEffect(() => {
        setActiveArticleTagId(hash ? decodeURI(hash).split('#')[1] : null)
    }, [hash])

    return (
        <Layout location={props.location} title={siteTitle || ''} theme={theme}>
            <div style={{ position: 'relative' }}>
                <Seo
                    title={post.frontmatter?.title}
                    description={post.frontmatter?.spoiler}
                    slug={post.fields?.slug}
                />
                <ArticleNav headings={headings} activeArticleTagId={activeArticleTagId} />
                <main>
                    <article>
                        <header style={{ marginBottom: rhythm(1) }}>
                            {post.frontmatter?.title && (
                                <h1
                                    style={{
                                        color: 'var(--main)',
                                        paddingTop: 0,
                                        paddingBottom: rhythm(1 / 4)
                                    }}
                                >
                                    {post.frontmatter.title}
                                </h1>
                            )}
                            <p
                                style={{
                                    ...scale(-1 / 5),
                                    display: 'block',
                                    marginBottom: 0
                                }}
                            >
                                {`${formatPostDate(
                                    post.frontmatter?.date || 0
                                )} • ${formatReadingTime(post.timeToRead || 0)}`}
                            </p>
                        </header>
                        {post.html && (
                            <ArticleContent
                                html={post.html}
                                activeArticleTagId={activeArticleTagId}
                                onActiveArticleTagChange={_activeArticleTagId => {
                                    setActiveArticleTagId(_activeArticleTagId)
                                }}
                            />
                        )}
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
                            marginTop: rhythm(0.25)
                        }}
                    >
                        <Link
                            style={{
                                boxShadow: 'none',
                                textDecoration: 'none',
                                color: 'var(--main)'
                            }}
                            to={'/'}
                        >
                            {siteTitle}
                        </Link>
                    </h3>
                    <Bio />
                    {(previous || next) && (
                        <nav>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    listStyle: 'none',
                                    padding: 0,
                                    marginTop: '3.5rem'
                                }}
                            >
                                <div>
                                    {previous && (
                                        <Link
                                            to={'/' + previous.fields?.slug}
                                            rel="prev"
                                            style={{ marginRight: 20 }}
                                        >
                                            ← {previous.frontmatter?.title}
                                        </Link>
                                    )}
                                </div>
                                <div>
                                    {next && (
                                        <Link to={'/' + next.fields?.slug} rel="next">
                                            {next.frontmatter?.title} →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </nav>
                    )}
                </aside>
            </div>
            {theme && <GiscusComments theme={theme} />}
        </Layout>
    )
}

export default BlogPostTemplate

type QueryData = {
    site: {
        siteMetadata: Queries.SiteSiteMetadata
    }
    markdownRemark: Queries.MarkdownRemark
}

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
