import { useEffect } from 'react'

const useTheme = (onThemeChange: (newTheme: ThemeType) => void) => {
    useEffect(() => {
        onThemeChange(window.__theme)
        window.__onThemeChange = () => {
            onThemeChange(window.__theme)
        }
    }, [])
}

export default useTheme
