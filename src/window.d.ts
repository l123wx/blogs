type ThemeType = 'dark' | 'light' | null

declare interface Window {
    __theme: ThemeType
    __setPreferredTheme: (newTheme: ThemeType) => void
    __onThemeChange: (newTheme: ThemeType) => void
}
