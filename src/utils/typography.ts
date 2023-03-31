import '../styles/fonts.css'

import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
    a: {
        boxShadow: 'unset',
        color: 'var(--textLink)',
    },
    'a:hover': {
        boxShadow: '0 1px 0 0 currentColor',
        color: 'var(--textLink)'
    },
    'h1, h2, h3, h4, h5, h6': {
        margin: 0,
        textTransform: 'unset',
        paddingBottom: '1.75rem'
    },
    'a.anchor.before': {
        top: '2rem'
    },
    'h1': {
        paddingTop: '3.5rem',
    },
    'h1 a.anchor.before': {
        top: '3.5rem'
    },
    'h2': {
        paddingTop: '3rem'
    },
    'h2 a.anchor.before': {
        top: '3rem'
    },
    'h3': {
        paddingTop: '2.5rem'
    },
    'h3 a.anchor.before': {
        top: '2.5rem'
    },
    'h4, h5, h6': {
        paddingTop: '2rem'
    },
    [`
        h1 + h1, h1 + h2, h1 + h3, h1 + h4, h1 + h5, h1 + h6,
        h2 + h1, h2 + h2, h2 + h3, h2 + h4, h2 + h5, h2 + h6,
        h3 + h1, h3 + h2, h3 + h3, h3 + h4, h3 + h5, h3 + h6,
        h4 + h1, h4 + h2, h4 + h3, h4 + h4, h4 + h5, h4 + h6,
        h5 + h1, h5 + h2, h5 + h3, h5 + h4, h5 + h5, h5 + h6,
        h6 + h1, h6 + h2, h6 + h3, h6 + h4, h6 + h5, h6 + h6
    `]: {
        marginTop: '-1.75rem'
    },
    hr: {
        background: 'var(--hr)',
    },
    'a.gatsby-resp-image-link': {
        boxShadow: 'none',
    },
    // These two are for gatsby-remark-autolink-headers:
    'a.anchor': {
        boxShadow: 'none',
    },
    'a.anchor svg[aria-hidden="true"]': {
        stroke: 'var(--textLink)',
    },
    'p code': {
        fontSize: '1rem',
    },
    'h1 code, h2 code, h3 code, h4 code, h5 code, h6 code': {
        fontSize: 'inherit',
    },
    'li code': {
        fontSize: '1rem',
    },
    blockquote: {
        color: 'inherit',
        borderLeftColor: 'inherit',
        opacity: '0.8',
    },
    'blockquote.translation': {
        fontSize: '1em',
    }
})

delete Wordpress2016.googleFonts

Wordpress2016.bodyFontFamily = ['Merriweather', 'sans-serif']

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
    typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
