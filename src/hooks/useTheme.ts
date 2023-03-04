import { useEffect } from 'react'

const useTheme = (onThemeChange: (newTheme: ThemeType) => void) => {
    useEffect(() => {
        window.__onThemeChange = () => {
            onThemeChange(window.__theme)
        }
    }, [])
}

export default useTheme
