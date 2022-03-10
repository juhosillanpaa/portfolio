import React, { useRef, useEffect, useState } from 'react'
import './Canvas.css'


const AnimationCanvas = ({
    width,
    height,
    draw,
    input,
    update,
    ready
}) => {
    const canvaRef = useRef(null)
    useEffect(() => {
        if (!ready){
            return
        }
        const canvas = canvaRef.current
        const context = canvas.getContext('2d')

        let frameCount = 0
        let animationFrameId
        let continueAnimation = true

        const render = () => {
            frameCount++
            [input, continueAnimation] = update(width, height, frameCount, input)
            draw(context, frameCount, input)
            if (!continueAnimation) {
                window.cancelAnimationFrame(animationFrameId)
                return
            }
            animationFrameId = window.requestAnimationFrame(render)
        }   
        render()
        
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    },[draw, ready, input, update, width, height])

    return (
        <canvas
            className = 'Canvas'
            ref = {canvaRef}
            width={width}
            height={height}
        />

        
    )
}

export default AnimationCanvas