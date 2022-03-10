import React, { useRef, useEffect} from 'react'
import './Canvas.css'


const Canvas = ({
    width,
    height,
    draw,
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
        let animationFrameId
        let sceneUpdated

        const render = () => {
            sceneUpdated = update()
            if (sceneUpdated){
                draw(context)
            }
            animationFrameId = window.requestAnimationFrame(render)
        }   
        render()
        
        return () => {
            console.log('cancelling')
            window.cancelAnimationFrame(animationFrameId)
        }
    },[draw, ready, update, width, height])

    return (
        <canvas
            className = 'Canvas'
            ref = {canvaRef}
            width={width}
            height={height}
        />

        
    )
}

export default Canvas