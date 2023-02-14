import React from 'react'
import { Link } from 'gatsby'

import { rhythm } from '../utils/typography'
import { formatPostDate, formatReadingTime } from '../utils/helpers'

class ArticleItem extends React.Component {
    render() {
        const { slug, title, spoiler, date, timeToRead } = this.props

        return (
            <article
                style={{
                    marginBottom: rhythm(2)
                }}
            >
                <header>
                    <h3
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: rhythm(1),
                            marginBottom: rhythm(1 / 4),
                            paddingTop: 0,
                            paddingBottom: 0
                        }}
                    >
                        <Link
                            style={{ boxShadow: 'none' }}
                            to={slug}
                            rel="bookmark"
                        >
                            {title}
                        </Link>
                    </h3>
                    <small>
                        {formatPostDate(date)}
                        {` • ${formatReadingTime(timeToRead)}`}
                    </small>
                </header>
                <p
                    dangerouslySetInnerHTML={{ __html: spoiler }}
                />
            </article>
        )
    }
}

export default ArticleItem