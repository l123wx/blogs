import { Link } from 'gatsby'
import React, { useEffect } from 'react'
import './ArticleNav.css'

const ArticleNav = ({ headings }) => {
    const hash = window.location.hash

    const handleTagActive = () => {
        const articleTagEl = document.querySelector('.article-tag.active')
        const articleNavBoxEl = document.querySelector('.article-nav-box')
        const isArticleActiveElNotVisible =
            articleTagEl &&
            articleNavBoxEl &&
            (
                articleNavBoxEl.scrollTop > articleTagEl.clientHeight + articleTagEl.offsetHeight ||
                articleNavBoxEl.scrollTop + articleNavBoxEl.clientHeight < articleTagEl.offsetHeight
            )

        if (isArticleActiveElNotVisible) {
            articleTagEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    useEffect(handleTagActive, [hash])

    return (
        <div className='article-nav'>
            <div className='article-nav-box'>
                <ul>
                    {
                        headings.map(item => {
                            const isActiveTag = hash === encodeURI(`#${item.id}`)

                            return (
                                <li
                                    key={item.id}
                                    className={`article-tag d${item.depth}${isActiveTag ? ' active' : ''}`}
                                >
                                    <Link to={'#' + item.id}>{item.value}</Link>
                                </li>
                            )
                        }

                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default ArticleNav