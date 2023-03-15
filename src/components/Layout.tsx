import React, { ReactNode } from 'react'
import { Link, PageProps } from 'gatsby'
import Toggle from './Toggle'
import Helmet from 'react-helmet'

import { rhythm, scale } from '../utils/typography'
import sun from '../images/sun.png'
import moon from '../images/moon.png'

type Props = {
    theme: ThemeType
    location: PageProps['location']
    title: string
    children?: ReactNode
}

const Layout: React.FC<Props> = ({ location, title, children, theme }) => {
    const renderHeader = (props: Omit<Props, 'theme'>) => {
        const { location, title } = props
        // @ts-ignore
        const rootPath = `${__PATH_PREFIX__}/`

        return (
            <h1
                style={{
                    ...scale(location.pathname === rootPath ? 0.75 : 0.5),
                    transition: 'all 0.5s',
                    paddingBottom: 0,
                    paddingTop: 0
                }}
            >
                <Link
                    style={{
                        boxShadow: 'none',
                        textDecoration: 'none',
                        color: 'var(--textTitle)'
                    }}
                    to={'/'}
                >
                    {title}
                </Link>
            </h1>
        )
    }

    return (
        <div
            style={{
                color: 'var(--textNormal)',
                background: 'var(--bg)',
                transition: 'color 0.2s ease-out, background 0.2s ease-out',
                minHeight: '100vh'
            }}
        >
            <Helmet
                meta={[
                    {
                        name: 'theme-color',
                        content: theme === 'light' ? '#ffffff' : '#282c35'
                    }
                ]}
            />
            <div
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    maxWidth: rhythm(24),
                    padding: `2.625rem ${rhythm(3 / 4)}`
                }}
            >
                <header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: rhythm(3 / 2),
                        marginTop: 0
                    }}
                >
                    {renderHeader({ location, title })}
                    {theme && (
                        <Toggle
                            icons={{
                                checked: (
                                    <img
                                        src={moon}
                                        width="16"
                                        height="16"
                                        alt="moon-icon"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                ),
                                unchecked: (
                                    <img
                                        src={sun}
                                        width="16"
                                        height="16"
                                        alt="sun-icon"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                )
                            }}
                            checked={theme === 'dark'}
                            onChange={checked =>
                                window.__setPreferredTheme(checked ? 'dark' : 'light')
                            }
                        />
                    )}
                </header>
                <div
                    style={{
                        position: 'relative'
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
