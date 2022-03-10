import React, { useRef, useEffect, useState } from 'react'
import RefCanvas from './RefCanvas'

const gravity = 0.5
const CLOSE_D = 0.05


const DropAnimation = ({width, height, show = true, dx = 0, dy = 0, pointRef}) => {
    const target_y = height - 1

    const stopFunction = (point) => {
        if (target_y - point.y < CLOSE_D){
            return true
        }
        else return false
    }

    useEffect(() => {
        pointRef.current.points.forEach(point => {
            point.updateForce([0*gravity, 1*gravity])
            point.updateStopFunction(stopFunction)
        })

    },[])

    const update = () => {
        //return true
        let continueAnimation = false
        pointRef.current.points.forEach(point => {
            let continue_this = point.update(width, height)
            if (continue_this){ continueAnimation = true}
        })
        return continueAnimation
    }



    const draw = (ctx,) => {
        let points = pointRef.current.points
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        points.forEach(point => {
            point.draw(ctx)
        })
        
    }


    if (!show){
        return (
            <></>
        )
    }

    return (
       <div>
           <RefCanvas
                width = {width}
                height = {height}
                draw = {draw}
                update = {update}
                ready = {true}
            />
       </div>

        
    )
}

export default DropAnimation