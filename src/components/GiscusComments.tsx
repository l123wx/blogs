import React, { useMemo } from 'react'
import Giscus from '@giscus/react'

type Props = {
    theme: ThemeType | null
}

const GiscusComments: React.FC<Props> = ({ theme }) => {
    return useMemo(() => {
        return (
            <div style={{
                marginTop: '80px'
            }}>
                <Giscus
                    repo="l123wx/blogs"
                    repoId="R_kgDOI4RG4w"
                    category="comments"
                    categoryId="DIC_kwDOI4RG484CUpKS"
                    mapping="pathname"
                    strict="0"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme={theme === 'light' ? 'light' : 'dark_dimmed'}
                    lang="zh-CN"
                    loading="lazy"
                />
            </div>
        )
    }, [theme])
}

export default GiscusComments