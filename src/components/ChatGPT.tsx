import React, { useState, useEffect } from 'react'
import '../styles/ChatGPT.css'
import headIcon from '../images/head-icon.png'

const ChatGPT: React.FC = () => {
    const [isShow, setIsShow] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const handleButtonClick = () => {
        setIsShow(!isShow)
    }

    const handleIframeOnload = () => {
        setIsLoading(false)
    }

    useEffect(() => {
        if (isShow && !isLoaded) {
            setTimeout(() => {
                setIsLoaded(true)
            }, 500)
        }
    }, [isShow, isLoaded])

    return (
        <div className={`chat-gpt-container ${isShow ? ' showing' : ''}`}>
            <div className="iframe-container">
                {isLoading && <div></div>}
                {isLoaded && (
                    <iframe
                        src="https://chatgpt.l123wx.buzz"
                        loading="lazy"
                        onLoad={handleIframeOnload}
                    ></iframe>
                )}
            </div>
            <img
                src={headIcon}
                className={`icon ${isShow ? 'checked' : ''}`}
                onClick={handleButtonClick}
            />
        </div>
    )
}

export default ChatGPT
