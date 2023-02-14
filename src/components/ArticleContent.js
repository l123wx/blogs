import React, { useEffect } from 'react'
import lodash from 'lodash'

const calcDistanceToViewTop = (element) => element.getBoundingClientRect().top

const ArticleContent = ({ html, onActiveArticleTagChange }) => {
    useEffect(() => {
        const updateActiveArticleTagId = lodash.throttle(() => {
            let activeArticleTagIndex = 0
            const tagElList = document.querySelectorAll('.anchor.before')

            for (let [index, element] of tagElList.entries()) {
                const targetElementDistanceToViewTop = calcDistanceToViewTop(element.parentElement)
                if (index === 0 && targetElementDistanceToViewTop >= 0) {
                    break
                } else if (index === tagElList.length - 1) {
                    activeArticleTagIndex = tagElList.length - 1
                    break
                } else {
                    const nextElementDistanceToViewTop = calcDistanceToViewTop(tagElList[index + 1].parentElement)
                    const isDifferentSign = (targetElementDistanceToViewTop <= 0) !== (nextElementDistanceToViewTop <= 0)

                    if (isDifferentSign) {
                        activeArticleTagIndex = index
                        break
                    }
                }
            }

            onActiveArticleTagChange(tagElList[activeArticleTagIndex].parentElement.id)
        }, 100)

        window.addEventListener('scroll', updateActiveArticleTagId)

        return () => {
            window.removeEventListener('scroll', updateActiveArticleTagId)
        }
    }, [onActiveArticleTagChange])

    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    )
}

export default ArticleContent