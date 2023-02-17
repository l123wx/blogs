import React, { ReactNode } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
    query GetSiteMetadata {
        site {
            siteMetadata {
                title
                author
                description
                siteUrl
            }
        }
    }
`

type PropTypes = {
    description?: string | null
    image?: string
    meta?: {
        name: string
        content: string
    }[]
    slug?: string
    title?: string | null
    lang?: string
}

const SEO = ({
    image,
    description,
    meta = [],
    title = '',
    slug = '',
    lang = 'zh-cn'
}: PropTypes) => {
    const data = useStaticQuery(query)
    const { siteMetadata } = data.site
    const metaDescription = description || siteMetadata.description
    const metaImage = image ? `${siteMetadata.siteUrl}/${image}` : null
    const url = `${siteMetadata.siteUrl}${slug}`
    return (
        <Helmet
            htmlAttributes={{ lang }}
            {
            ...(title
                ? {
                    titleTemplate: `%s — ${siteMetadata.title}`,
                    title,
                }
                : {
                    title: `${siteMetadata.title}`
                })
            }
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    property: 'og:url',
                    content: url,
                },
                {
                    property: 'og:title',
                    content: title || siteMetadata.title,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                }
            ]
                .concat(
                    metaImage
                        ? [
                            {
                                property: 'og:image',
                                content: metaImage,
                            }
                        ]
                        : []
                )
                .concat(meta)
            }
        />
    )
}

export default SEO
