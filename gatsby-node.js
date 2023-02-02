const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')

    createPage({
      path: '/',
      component: path.resolve('./src/templates/blog-index.js')
    })

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { frontmatter: {date: DESC}}
              limit: 1000
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
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
          return
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1
              ? null
              : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next
            },
          })
        })
      })
    )
  })
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (_.get(node, 'internal.type') === `MarkdownRemark`) {
    createNodeField({
      node,
      name: 'slug',
      value: path.basename(path.dirname(_.get(node, 'fileAbsolutePath'))),
    })

    // Capture a list of what looks to be absolute internal links.
    // We'll later remember which of them have translations,
    // and use that to render localized internal links when available.

    // TODO: check against links with no trailing slashes
    // or that already link to translations.
    const markdown = node.internal.content
    let maybeAbsoluteLinks = []
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

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemarkFields {
      maybeAbsoluteLinks: [String]
    }
  `)
}