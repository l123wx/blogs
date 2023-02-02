import React from 'react'
import profilePic from '../images/profile-pic.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex'
        }}
      >
        <img
          src={profilePic}
          alt="elvis's avatar"
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <div style={{ maxWidth: 310 }}>
          Elvis的个人博客.<br />
          好好学习，天天向上
        </div>
      </div>
    )
  }
}

export default Bio
