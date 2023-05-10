import path from 'path'
import _ from 'lodash'
import { GatsbyNode } from 'gatsby'

export type BlogPostProps = {
    slug: string
    previous: Queries.MarkdownRemark | null
    next: Queries.MarkdownRemark | null
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
    const { createPage } = actions

    const blogPost = path.resolve('./src/templates/blog-post.tsx')

    createPage({
        path: '/',
        component: path.resolve('./src/templates/blog-index.tsx')
    })

    const query = `
            {
                allMarkdownRemark(
                    sort: { frontmatter: { date: DESC } }
                    filter: {fields: {slug: {ne: null}}}
                ) {
                    edges {
                        node {
                            fields {
                                slug
                                maybeAbsoluteLinks
                            }
                            frontmatter {
                                title
                            }
                        }
                    }
                }
            }
        `
    type QueryData = {
        allMarkdownRemark: Queries.MarkdownRemarkConnection
    }

    const result = await graphql<QueryData>(query)

    if (result.errors) {
        console.log(result.errors)
        throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data!.allMarkdownRemark.edges

    posts.forEach((post, index) => {
        if (post.node && post.node.fields) {
            const next = index === posts.length - 1 ? null : posts[index + 1].node
            const previous = index === 0 ? null : posts[index - 1].node

            createPage<BlogPostProps>({
                path: post.node.fields.slug!,
                component: blogPost,
                context: {
                    slug: post.node.fields.slug!,
                    previous,
                    next
                }
            })
        }
    })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
    const { createNodeField } = actions
    const isDevEnv = process.env.NODE_ENV === 'development'

    if (node.internal.type === `MarkdownRemark`) {
        createNodeField({
            node,
            name: 'slug',
            value:
                isDevEnv || !(node.frontmatter as Queries.MarkdownRemark['frontmatter'])?.isPending
                    ? path.basename(path.dirname(node.fileAbsolutePath as string))
                    : null
        })

        // Capture a list of what looks to be absolute internal links.
        // We'll later remember which of them have translations,
        // and use that to render localized internal links when available.

        // TODO: check against links with no trailing slashes
        // or that already link to translations.
        const markdown = node.internal.content || ' '
        let maybeAbsoluteLinks: string[] = []
        let linkRe = /\]\((\/[^\)]+\/)\)/g
        let match = linkRe.exec(markdown)
        while (match != null) {
            maybeAbsoluteLinks.push(match[1])
            match = linkRe.exec(markdown)
        }
        createNodeField({
            node,
            name: 'maybeAbsoluteLinks',
            value: _.uniq(maybeAbsoluteLinks)
        })
    }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
    const { createTypes } = actions
    createTypes([
        `type MarkdownRemarkFields {
            maybeAbsoluteLinks: [String!]!
            slug: String
        }`,
        `type MarkdownRemarkFrontmatter {
            isPending: Boolean
        }`
    ])
}
