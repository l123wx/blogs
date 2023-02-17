/*
 * Copyright (c) 2015 instructure-react
 * Forked from https://github.com/aaronshaf/react-toggle/
 * + applied https://github.com/aaronshaf/react-toggle/pull/90
 **/

import '../styles/Toggle.css'

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import _ from 'lodash'

// Copyright 2015-present Drifty Co.
// http://drifty.com/
// from: https://github.com/driftyco/ionic/blob/master/src/util/dom.ts
const pointerCoord = (event: any): { x: number, y: number } => {
    // get coordinates for either a mouse click
    // or a touch depending on the given event
    if (event) {
        const changedTouches = event.changedTouches
        if (changedTouches && changedTouches.length > 0) {
            const touch = changedTouches[0]
            return { x: touch.clientX, y: touch.clientY }
        }
        const pageX = event.pageX
        if (pageX !== undefined) {
            return { x: pageX, y: event.pageY }
        }
    }
    return { x: 0, y: 0 }
}

type IconType = 'checked' | 'unchecked'

type Props = {
    className?: string
    icons?: Record<IconType, ReactNode>
    checked?: boolean
    disabled?: boolean
    onChange?: (checked: boolean) => void
}

const Toggle: React.FC<Props> = ({
    className,
    icons: _icons,
    checked = false,
    disabled,
    onChange
}) => {
    let startX = useRef<number | null>(null)
    let touchStarted = useRef(false)
    let touchMoved = useRef(false)

    const classes =
        'react-toggle' +
        (checked ? ' react-toggle--checked' : '') +
        (disabled ? ' react-toggle--disabled' : '') +
        (className ? ' ' + className : '')

    const handleClick: React.MouseEventHandler & React.KeyboardEventHandler = (event) => {
        onChange && onChange(!checked)
    }

    const handleTouchStart: React.TouchEventHandler = (event) => {
        startX.current = pointerCoord(event).x
        touchStarted.current = true
    }

    const handleTouchMove: React.TouchEventHandler = (event) => {
        if (!touchStarted) return
        touchMoved.current = true

        if (startX.current != null) {
            let currentX = pointerCoord(event).x
            if (checked && currentX + 15 < startX.current) {
                onChange && onChange(false)
                startX.current = currentX
            } else if (!checked && currentX - 15 > startX.current) {
                onChange && onChange(true)
                startX.current = currentX
            }
        }
    }

    const handleTouchEnd: React.TouchEventHandler = (event) => {
        if (!touchMoved) return
        event.preventDefault()

        if (startX != null) {
            onChange && onChange(!checked)
            touchStarted.current = false
            startX.current = null
            touchMoved.current = false
        }
    }

    const handleTouchCancel: React.TouchEventHandler = () => {
        if (startX != null) {
            touchStarted.current = false
            startX.current = null
            touchMoved.current = false
        }
    }

    const getIcon = (type: IconType) => {
        if (!_icons) {
            return null
        }
        return _icons[type]
    }

    return (
        <div
            role="presentation"
            className={classes}
            onClick={handleClick}
            onKeyDown={handleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
        >
            <div className="react-toggle-track">
                <div className="react-toggle-track-check">
                    {getIcon('checked')}
                </div>
                <div className="react-toggle-track-x">
                    {getIcon('unchecked')}
                </div>
            </div>
            <div className="react-toggle-thumb" />
        </div>
    )
}

export default React.memo(Toggle)