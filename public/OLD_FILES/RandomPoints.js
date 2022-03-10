import React, { useState } from 'react'
import Canvas from './Canvas'


const create100dp = (width, height) => {
    let points = []
    for (let i = 0; i++; i < 100){
        let point = {
            x: Math.floor( Math.random()*width ),
            y: Math.floor( Math.random()*height ),
            direction: [ Math.random()*2-1, Math.random()*2 - 1 ],
            velocity: Math.random()
        }
        points.append(point)
    }
    return points
}

const updatePoints= (width, height, points) => {
    let updated = points.map(p => {
        let point = {
            ...p,
            x: p.x + p.velocity*p.direction[0],
            y: p.y + p.velocity*p.direction[1],

        }
        return point
    })
    return updated
}


const RandomPoints = () => {
    const width=600
    const height=600
    const [points, setPoints] = useState(create100dp(600,600))


    
    return (
        <div>
       
        </div>
    )
}
export default RandomPoints