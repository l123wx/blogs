import React from 'react'
import profilePic from '../images/profile-pic.png'
import { rhythm } from '../utils/typography'

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
    )
}

export default Bio
