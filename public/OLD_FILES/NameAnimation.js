import React, { useRef, useEffect, useState } from 'react'
import './Canvas.css'
import AnimamationCanvas from './AnimationCanvas'
import {
    random_n,
    addNoise,
    get_unit_vector,
    get_free_direction_vector,
    get_noised_unit_direction_vector
} from './vector_math.js'

const name_j = require('../../Utils/Letters/name.txt')

const gravity_r = 0.01
const gravity_n = 20
const LAND_D = 1
const N_POINTS = 800
const CLOSE_D = 0.1


const read_name_and_create_points = (width, height, setPoints, dx, dy) => {
    fetch(name_j)
    .then(response => response.text())
    .then(text => {
        let positions = []
        let letter_arrays = []
        let lines = text.split('\r\n')
        console.log({lines})
        lines.forEach(line => {
            if (line == '#' && letter_arrays.length > 0){
                positions.push(letter_arrays)
                letter_arrays = []
                return
            }
            let temp = line.split(',')
            letter_arrays.push([ Number(temp[0]) + dx, Number(temp[1]) + dy ])
        })
        let points = createPoints(width, height, positions)
        setPoints(points)
    })
}

const createPoints = (width, height, name) => {
    let points = []
    let a = 0
    let b = 0
    for (let i = 0; i < N_POINTS; i++){

        let point = {
            x: Math.floor( Math.random()*width ),
            y: Math.floor( Math.random()*height ),
            direction: [ Math.random()*2-1, Math.random()*2 - 1 ],
            velocity: Math.random(),
            trail: [],
            landed: false,
            target_letter_index: a,
            target_index: b,
            target: name[a][b],
            stop: false, id: i
        }

        points.push(point)
        b = b + 1
        if (b >= name[a].length) {
            a = a + 1
            if (a >= name.length){ a = 0}
            b = 0
        }
    }
    return points
}


const getGavityForce = (distance, mode) => {
    if (mode == 'reverse'){
        return gravity_r * Math.sqrt(distance)
    } else if ( mode == 'exp'){
        return (gravity_r * Math.sqrt(distance) + gravity_n / distance**2 ) * 3
    } else if (mode == 'linear'){
        let f =  Math.min(gravity_n /  distance, 50)
        return f
    }else return gravity_n
}


const get_gravity_vector_to_target_point = (point, mode) => {
    // Calculates the gravity to the target point of given point. returns the gravity vector
    let target_point = point.target
    let g_dir_vec = [target_point[0] - point.x, target_point[1]-point.y]
    let g_u_vec = get_unit_vector(g_dir_vec)
    let d = Math.sqrt((point.x - target_point[0])**2 + (point.y - target_point[1])**2)

    //let g_force = gravity*Math.sqrt(d)
    let g_force = getGavityForce(d, mode)
    let g_vec = [g_u_vec[0]*g_force, g_u_vec[1]*g_force]
    return g_vec
}


const updatePointPosition = (p, width, height, mode) => {
    // update the gravity effects and direction
    if (p.stop){
        if (p.trail.length > 0){
            p.trail.pop()
        }
        return
    }
    let d_vec = get_free_direction_vector(p)
    let g_vec = get_gravity_vector_to_target_point(p, mode)
    let vec = [d_vec[0]+g_vec[0], d_vec[1] + g_vec[1]]

    let x = p.x + vec[0]
    let y = p.y + vec[1]

    //Make sure points dont escape the canvas
    if (x > width || x < 0){
        vec = [-vec[0], vec[1]]
        x = p.x + vec[0]
    }
    if (y > height || y < 0){
        vec = [vec[0], -vec[1]]
        y = p.y + vec[1]
    }

    //update trail
    let trail = p.trail
    trail.unshift([p.x, p.y])
    if (trail.length > 3){ trail.pop()}

    p.x = x
    p.y = y
    p.direction = get_unit_vector(vec)
    p.velocity = Math.sqrt(vec[0]**2 + vec[1]**2) * 0.9
    p.trail = trail
}


const updatePointTargetIndex_simple = (p) => {
    let target = p.target
    let d = Math.sqrt((p.x - target[0])**2 + (p.y - target[1])**2)
    if (d < CLOSE_D){
        p.stop = true
    }
}


const UpdateLandingAnimation = (width, height, frameCount, input) => {
    let points = input
    let all_stopped = true
    let count = 0
    points.forEach(p => {
        updatePointTargetIndex_simple(p)
        updatePointPosition(p, width, height, 'reverse')
        if (!p.stop){
            all_stopped = false
        }
    })
    let continueAnimation = !all_stopped
    return [points, continueAnimation]
}



const NameAnimation = ({width, height, show = true, dx = 0, dy = 0}) => {
    const [points, setPoints] = useState([])
 

    const draw = (ctx, frameCount, points) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = 'white'
        ctx.strokeStyle='white'
        points.forEach(point => {
            ctx.fillRect(point.x, point.y, 2, 2)
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            point.trail.forEach(pos => {
                ctx.lineTo(pos[0], pos[1])
            })
            ctx.stroke()
        })
        
    }
    useEffect(() => {
        read_name_and_create_points(width, height, setPoints, dx, dy)
    },[])

    if (!show){
        return (
            <></>
        )
    }

    return (
       <div>
           <AnimamationCanvas
                width = {width}
                height = {height}
                draw = {draw}
                update = {UpdateLandingAnimation}
                input = {points}
                ready = {points.length > 0}
            />
       </div>

        
    )
}

export default NameAnimation