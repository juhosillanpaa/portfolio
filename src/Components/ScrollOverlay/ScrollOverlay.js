import React, {useState, useEffect } from 'react'
import './ScrollOverlay.css'


const ScrollOverlay = ({
    startingHeight = 0,
    height
}) => {
    const [scrollDown, setScrollDown] = useState(false)
    const [scrollUp, setScrollUp] = useState(false)

    const calculateScrollHeight = (timestamp, total_duration, total_height) => {
        let x = ((timestamp * Math.PI)/total_duration ) + Math.PI
        let y = (Math.cos(x) + 1 )/ 2
        let height = y * total_height
        return height
    }
	
    const scrollToDistance = (distance) => {
        window.scroll({
            top: distance,
            left: 0,
            behavior:'auto'
        })
    }

	useEffect(() => {
        if (!scrollDown){return}
        let animationFrameId, start
        let duration = 1000
        const update = (timestamp) => {
            if (start === undefined){
                start = timestamp
            }
            const elapsed = timestamp - start
            let dy = calculateScrollHeight(elapsed, duration, height)
            if (elapsed >= duration){
                scrollToDistance(startingHeight + height)
                window.cancelAnimationFrame(animationFrameId)
				setScrollDown(false)
                return
            }else{
                scrollToDistance(startingHeight + dy)
                animationFrameId = window.requestAnimationFrame(update)
            }
        }
        update()
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [scrollDown])


    const WheelEvent = (e) => {
        console.log('scroll')
        if (e.deltaY && !scrollDown){
            //setScrollDown(true)
        }
    }


    return (
        <div className='ScrollOverlay' onWheel = {(e) => WheelEvent(e)} >

        </div>
    )
}
export default ScrollOverlay