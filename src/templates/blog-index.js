import { graphql } from 'gatsby'
import * as React from 'react'

class BlogIndexTemplate extends React.Component {
  render() {

    return (
      <div>123</div>
    )
  }
}

export default BlogIndexTemplate

export const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          html
        }
      }
    }
  }
`