type ThemeType = 'dark' | 'light'

declare interface Window {
    __theme: ThemeType
    __setPreferredTheme: (newTheme: ThemeType) => void
    __onThemeChange: (newTheme: ThemeType) => void
}