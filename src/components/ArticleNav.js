import { Link } from 'gatsby'
import React, { useEffect, useRef } from 'react'
import '../styles/ArticleNav.css'

const ArticleNav = ({ headings, activeArticleTagId }) => {
    const activeArticleTagRef = useRef(null)

    useEffect(
        () => activeArticleTagRef.current?.scrollIntoView({ block: 'nearest' }),
        [activeArticleTagId]
    )

    return (
        <div className='article-nav'>
            <div className='article-nav-box'>
                <ul>
                    {
                        headings.map(item => {
                            const isActiveTag = activeArticleTagId && activeArticleTagId === item.id

                            return (
                                <li
                                    key={item.id}
                                    ref={isActiveTag ? activeArticleTagRef : null}
                                    className={`article-tag d${item.depth}${isActiveTag ? ' active' : ''}`}
                                >
                                    <Link to={'#' + item.id}>{item.value}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ArticleNav