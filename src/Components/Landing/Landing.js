import React, {useState, useEffect, useRef} from 'react'
import './Landing.css'
import { Title } from '../Text'
import Canvas from '../Canvas/Canvas'
import Point from '../../Classes/Point/Point'


const name = require('../../Utils/Letters/name.txt')

const N_POINTS = 750
const gravity = 0.5
const CLOSE_D = 0.05


const read_name_and_create_targets = (setTargets, dx, dy) => {
    fetch(name)
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
        setTargets(positions)
    })
}

const createPoints = (width, height, targets, stopF) => {
    let points = []
    let id = 0
    for (let i = 0; i < targets.length; i++){
        for (let j = 0; j < targets[i].length; j++){
            let point = new Point(
                id,
                Math.floor( Math.random()*width ),          //x
                Math.floor( Math.random()*height ),         //y
                Math.random(),                              //velocity
                [ Math.random()*2-1, Math.random()*2 - 1 ], //direction
                2,                                          //size
                'white',                                    //color
            )
            point.updateTarget(targets[i][j])
            point.activateTargetGravity()
            point.updateStopFunction(stopF)
            points.push(point)
            id++
        }
    }
    return points
}



const Landing = (props) => {
    const [nameTargets, setNameTargets] = useState([])
    const pointRef = useRef({ points: [] })
    const [ height, setHeight ] = useState(0)
    const [ width, setWidth ] = useState(0)
    const dx = 200
    const dy = 500
    const target_y = height - 1

    useEffect(() => {
        read_name_and_create_targets(setNameTargets, dx, dy)
    },[])

    useEffect(() => {
        let element = document.getElementById('Landing-div')
        setHeight(element.clientHeight)
        setWidth(element.clientWidth)
    },[])

    useEffect(() => {
        if (nameTargets.length > 0 && width > 0 && height > 0){
            pointRef.current.points = createPoints(width, height, nameTargets, stopFunction_name)
        }
    },[nameTargets.length, width, height])


    const stopFunction_drop = (point) => {
        if (target_y - point.y < CLOSE_D){
            return true
        }
        else return false
    }
    const stopFunction_name = (p) => {
        let target = p.target
        let d = Math.sqrt((p.x - target[0])**2 + (p.y - target[1])**2)
        if (d < 1){
           return true
        }else return false
    }

    const activateTransition = () => {
        pointRef.current.points.forEach(point => {
            point.updateForce([0*gravity, 1*gravity])
            point.updateStopFunction(stopFunction_drop)
            point.deactivateTargetGravity()
        })
    }

    const draw = (ctx,) => {
        let points = pointRef.current.points
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        points.forEach(point => {
            point.draw(ctx)
        })
    }
    const update = () => {
        //return true
        let sceneUpdated = false
        pointRef.current.points.forEach(point => {
            let updated = point.update(width, height)
            if (updated){ sceneUpdated = true}
        })
        return sceneUpdated
    }

    return(
        <div className='Landing'id = 'Landing-div' onClick = {() => activateTransition()}>
            {height !== 0 && width !== 0 ?
                <Canvas width = {width} height = {height} draw = {draw} update = {update} ready = {true}/>
                : <></>
            }  
        </div>
    )
}

export default Landing
