import React from 'react'
import profilePic from '../images/profile-pic.png'
import { rhythm } from '../utils/typography'
import Footer from './Footer'

const bioContainerStyle = {
    display: 'flex'
}

const avatarStyle = {
    marginRight: rhythm(1 / 2),
    marginBottom: 0,
    width: rhythm(2),
    height: rhythm(2),
    borderRadius: '50%'
}

const Bio: React.FC = () => {
    return (
        <React.Fragment>
            <div style={bioContainerStyle}>
                <img
                    src={profilePic}
                    alt="elvis's avatar"
                    style={avatarStyle}
                />
                <div>
                    Hello, I'm Elvis.<br />
                    A front-end engineer.
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Bio
