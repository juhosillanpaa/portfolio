import React, {useState, useEffect, useRef} from 'react'
import PixiPoint from '../../Classes/Point/PixiPoint'
import { getTextPositions} from '../Canvas/pointPositions'
import './Pixie.css'
import { animate } from './animations.js'
import PixiEngine from '../../Classes/Engine/PixiEngine'


const Pixie = ({
    page,
    scroll={from:0, to:0},
    config,
    resize,
    headerPositions
}) => {
    const engineRef = useRef({engine: {points: []} })
    const contentRef = useRef(null)
    const animationRef = useRef({ animation: -1})

    const L = config.factor
    const M = config.factor - 1
    const S = config.factor - 2// - 2

    useEffect(() => {
        //initialize the text positions and engine
        let fontSize = 30
        let headerArrays = {}
        headerArrays.welcome = getTextPositions('template', 'Welcome', fontSize)
        headerArrays.iam = getTextPositions('template', "I am", fontSize)
        headerArrays.name = getTextPositions('template', 'Juho Sillanpää', fontSize)
        headerArrays.aboutme = getTextPositions('template', 'About me', fontSize)
        headerArrays.skills = getTextPositions('template', 'My Skills', fontSize)
        headerArrays.portfolio = getTextPositions('template', 'Portfolio', fontSize)
        engineRef.current.engine = new PixiEngine(contentRef.current)
        engineRef.current.engine.setHeaderArrays(headerArrays)
        engineRef.current.engine.setHeaderPositions(headerPositions)
        engineRef.current.engine.setPoints(createPoints(headerArrays.name.length))
        engineRef.current.engine.setReady()
        animateWelcome(true)
        engineRef.current.engine.render()

    },[])

    useEffect(() => {
        // play correct animation when user scrolls
        playScrollAnimation(page, scroll)
    },[page, scroll])

    useEffect(()=> {
        if (engineRef.current.engine.ready){
            engineRef.current.engine.resize()
            engineRef.current.engine.setHeaderPositions(headerPositions)
        }
    },[resize, headerPositions])

    useEffect(() => {
        let animationId, start
        let play = true
        const step = (timestamp) => {
            if (start === undefined){
                start = timestamp
            }
            const elapsed = timestamp - start
            play = playStartAnimation(elapsed)
            if (play){
                animationId = window.requestAnimationFrame(step)
            }
        }
        animationId = window.requestAnimationFrame(step)
        return () => {
            window.cancelAnimationFrame(animationId)
        }
    },[])


    const playScrollAnimation = ( page ) => {
        if (animationRef.current.animation === -1){
            // when page is loaded, the index is 0 and this fuinction gets fired
            // but we dont want to animate name, because of welcome animation
            animationRef.current.animation = 0
            return
        }
        engineRef.current.engine.setToFast()
        animationRef.current.animation = 10
        if (page === 0){
            animateName()
        }else if (page === 1){
            AnimateAbout()
        }
        else if (page === 2){
            animateSkills()
        }
        else if (page === 3){
            animatePortfolio()
        }
    }

    
    const createPoints = (length) => {
        let points = []
        for (let i = 0; i < length; i++){
            let point = new PixiPoint(i, M,)
            points.push(point)
        }
        return points
    }
 
    let AnimateAbout = () => engineRef.current.engine.animateHeader('aboutme', 'aboutme', S, M)
    let animateWelcome = (initializing) => engineRef.current.engine.animateHeader( 'welcome', 'main', M, L, initializing )
    let animateIam = () => engineRef.current.engine.animateHeader('iam', 'main', M, L)
    let animateSkills = () => engineRef.current.engine.animateHeader('skills', 'skills', S, M)
    let animatePortfolio = () => engineRef.current.engine.animateHeader('portfolio', 'portfolio', S, M)
    let animateName = () => engineRef.current.engine.animateHeader('name', 'main', M, L)


    const playStartAnimation = (elapsed) => {

        let ID = animationRef.current.animation
        if (ID === 10){
            return false
        }
        if (elapsed > 1500 &&  ID == 0){
            animationRef.current.animation = 1
            engineRef.current.engine.setToSlow()
            animateIam()
        }else if (elapsed > 3500 &&  ID == 1){
            animationRef.current.animation = 3
            engineRef.current.engine.setToSlow()
            animateName()
        }
        else if (elapsed > 8000 && [3,4,5,6].includes(ID)){
            let t = elapsed % 8000
            if (ID == 3){
                animationRef.current.animation = 4
            }else if (t > 500 && ID == 4){
                engineRef.current.engine.setToSlow()
                animateIam()
                animationRef.current.animation = 5
            }else if(t > 3000 && ID == 5){
                engineRef.current.engine.setToSlow()
                animateName()
                animationRef.current.animation = 6
            }else if (t < 1000 && ID == 6){
                animationRef.current.animation = 3
            }
        }
        return true
    }
   

    return(
        <div className='PIXI-container' id = 'animation-div'>
            <canvas id = {'template'} className = 'hiddenCanvas' />
            <div id = 'PIXI-engineC' ref = {contentRef}></div>
        </div>
    )
}

export default Pixie