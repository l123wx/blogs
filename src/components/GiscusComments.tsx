import React, { useEffect, useState } from 'react'
import Giscus from '@giscus/react'
import useTheme from '../hooks/useTheme'

const GiscusComments: React.FC = () => {
    const [theme, setTheme] = useState<ThemeType | null>(null)

    useTheme(newTheme => setTheme(newTheme))

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
}

export default GiscusComments