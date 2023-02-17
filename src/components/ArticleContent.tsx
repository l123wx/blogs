import React, { useEffect } from 'react'
import lodash from 'lodash'
import { isBrowser } from '../utils/helpers'

const calcDistanceToViewTop = (element: HTMLElement | null) => element
    ? element.getBoundingClientRect().top
    : 0

type Props = {
    html: string,
    activeArticleTagId: ActiveArticleTagId
    onActiveArticleTagChange: (tagId: ActiveArticleTagId) => void
}

const ArticleContent: React.FC<Props> = ({ html, onActiveArticleTagChange, activeArticleTagId }) => {
    useEffect(() => {
        const updateActiveArticleTagId = lodash.throttle(() => {
            let activeArticleTagIndex = 0
            const tagElList = document.querySelectorAll('.anchor.before')

            if (!tagElList.length) return

            for (let [index, element] of Array.from(tagElList).entries()) {
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

            const newActiveArticleTagId = tagElList[activeArticleTagIndex].parentElement?.id || null
            newActiveArticleTagId !== activeArticleTagId && onActiveArticleTagChange(newActiveArticleTagId)
        }, 100)

        isBrowser && window.addEventListener('scroll', updateActiveArticleTagId)

        return () => {
            isBrowser && window.removeEventListener('scroll', updateActiveArticleTagId)
        }
    }, [onActiveArticleTagChange])

    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    )
}

export default ArticleContent