import React, {useRef, useEffect} from 'react'
import './WebGL.css'
import * as PIXI from 'pixi.js'

const RUN = true

const WebGL = ({width, height, items, update }) => {

    const containerRef = useRef(null)
    const appRef = useRef({app: {}, ready: false})

    useEffect(() => {
        if (!appRef.current.ready && items.length ==0){
            //points are not ready yet => do nothing
            return
        }

        if ( !appRef.current.ready && items.length > 0){
            const pixie_container = containerRef.current
            const app = new PIXI.Application({
                antialias: true,
                backgroundAlpha: 0,
                resizeTo: pixie_container
            })
            pixie_container.appendChild(app.view)
            /*const container = new PIXI.Container()
            app.stage.addChild(container)
            */
            items.forEach(item => {
                app.stage.addChild(item.sprite)
            })
            appRef.current.app = app
            appRef.current.ready = true
        }else {
            //must be width or height changing (or user scrolling which updates update function for some reason)
            appRef.current.app.resize()
        }

        let animationFrameId
        let start
        let last

        const render = (timestamp) => {
            if (start === undefined){
                start = timestamp
                last = timestamp
            }
            const elapsed = timestamp - start
            const delta = (timestamp - last) / 1000
            last = timestamp
            update(elapsed, delta)
            animationFrameId = window.requestAnimationFrame(render)
        }   
        if (RUN){ animationFrameId = window.requestAnimationFrame(render) }
        
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
        
    },[width, height, items, update ])


    return (
        <div className='WebGL-container'>
            <div className='grid-container' id = "pixie-container" ref = {containerRef}>
                
            </div>
        </div>
    )
}
export default WebGL
