import React, {useState, useEffect, useRef} from 'react'
import PixiPoint from '../../Classes/Point/PixiPoint'
import { getTextPositions} from '../Canvas/pointPositions'
import './Animation.css'
import WebGL from '../WebGL/WebGL'
import { animate } from './animations.js'
import * as PIXI from 'pixi.js'

const WHITE_HEX = '0xffffff'


const WebGLAnimation = ({
    windowHeight,
    windowWidth,
    fullHeight,
    page,
    scroll={from:0, to:0},
    paddings,
}) => {
    const timeRef = useRef({ time: 0, index: 0})
    const pointRef = useRef({ points: [], animation: 0})
    const [welcome, setWelcome] = useState([])
    const [iam, setIam] = useState([])
    const [name, setName] = useState([])
    const [about, setAbout] = useState([])
    const [projects, setProjects ] = useState([])
    const [skills, setSkills ] = useState([])
    
    const L = paddings.factor
    const M = paddings.factor - 1
    const S = paddings.factor - 2
    console.log(name.length)
    useEffect(() => {
        // play correct animation when user scrolls
        playAnimation(scroll.to)
    },[scroll])

    useEffect(() => {
        playAnimation(page)
    },[windowHeight, windowWidth])

    useEffect(() => {
        let fontSize = 30
        setWelcome(getTextPositions('template', 'Welcome', fontSize))
        setIam(getTextPositions('template', "I am", fontSize))
        setName(getTextPositions('template', 'Juho Sillanpää', fontSize))
        setAbout(getTextPositions('template', 'About me', fontSize))
        setSkills(getTextPositions('template', 'My Skills', fontSize))
        setProjects(getTextPositions('template', 'Portfolio', fontSize))
    },[])

    useEffect(() => {
        if (name.length > 0 && windowHeight > 0 && pointRef.current.points.length === 0){
            pointRef.current.points = createPoints()
            animateWelcome(true)
        }
    },[windowHeight, name])

    const playAnimation = (index) => {
        if (index === 0){
            pointRef.current.animation = pointRef.current.animation == 10 ? 4 : 0
            animateName()
        }else if (index === 1){
            pointRef.current.animation = 10
            AnimateAbout()
        }
        else if (index === 2){
            pointRef.current.animation = 10
            animateSkills()
        }
        else if (index === 3){
            pointRef.current.animation = 10
            animateProjects()
        }
    }
    

    const createPoints = () => {
        let points = []
        for (let i = 0; i <name.length; i++){
            let point = new PixiPoint(i, M,)
            points.push(point)
        }
        return points
    }
 
    const AnimateAbout = () => {
        let x0 = windowWidth * paddings.about_x
        let y0 = 1 * windowHeight + windowHeight * paddings.about_top
        animate(pointRef.current.points, about, x0, y0, S, M)
    }
    

    const animateWelcome = (initializing ) => {
        let y0 = windowHeight * paddings.name_top
        let x0 = windowWidth /2
        animate(pointRef.current.points, welcome, x0, y0, M, L, initializing )
    }

    const animateIam = () => {
        let y0 = windowHeight * paddings.name_top
        let x0 = (windowWidth / 2)
        animate(pointRef.current.points, iam, x0, y0, M, L)
    }


    const animateSkills = () => {
        let x0 = windowWidth / 2 
        let y0 = 2*windowHeight + windowHeight * paddings.title_top
        animate(pointRef.current.points, skills, x0, y0, S, M) 
    }

    const animateProjects = () => {
        const x0 = (windowWidth / 2)
        let y0 = 3*windowHeight + windowHeight * paddings.title_top
        animate(pointRef.current.points, projects, x0, y0, S, M)
    }
    

    const animateName = () => {
        let y0 = windowHeight * paddings.name_top
        let x0 = (windowWidth / 2)
        animate(pointRef.current.points, name, x0, y0, M, L)
    }

    const animation = (elapsed) => {
        return
        let ID = pointRef.current.animation
        if (elapsed > 1500 &&  ID == 0){
            pointRef.current.animation = 1
            animateIam()
        }else if (elapsed > 3500 &&  ID == 1){
            pointRef.current.animation = 3
            animateName()
        }
        else if (elapsed > 8000 && [3,4,5,6].includes(ID)){
            let t = elapsed % 8000
            if (ID == 3){
                //possible explosion here
                pointRef.current.animation = 4
            }else if (t > 500 && ID == 4){
                animateIam()
                pointRef.current.animation = 5
            }else if(t > 3000 && ID == 5){
                animateName()
                pointRef.current.animation = 6
            }else if (t < 1000 && ID == 6){
                pointRef.current.animation = 3
            }
        }
    }

    const update = (elapsed, delta) => {
        let start = new Date()
        animation(elapsed)
        console.log(delta)
        pointRef.current.points.forEach(point => {
            point.update(delta)
        })
        timeRef.current.time += new Date() - start
        timeRef.current.index += 1

        if (timeRef.current.index == 200){
            console.log(timeRef.current.time / 200)
            timeRef.current.time = 0
            timeRef.current.index = 0

        }
    }



    return(
        <div className='WebGLAnimation'id = 'animation-div'>
            <canvas id = {'template'} className = 'hiddenCanvas' />

            {fullHeight !== 0 && windowWidth !== 0?
                <WebGL 
                    width = {windowWidth}
                    height = {fullHeight}
                    update = {update}
                    ready = {true}
                    items = {pointRef.current.points}
                />
                : <></>
            }
        </div>
    )
}

export default WebGLAnimation