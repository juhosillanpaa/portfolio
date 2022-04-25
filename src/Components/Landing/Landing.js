import React, { useEffect, useRef } from 'react'
import './Landing.css'

import forest_image from '../../images/forest7.jpg'
import ScrollDownAnimation from '../ScrollDownAnimation/ScrollDownAnimation'


const Landing = ({ onload}) => {
    const backgroundRef = useRef(null)
    useEffect(() => {
        let image = new Image()
        let src = '../../images/forest7.png'
        image.addEventListener('load', () => {
            backgroundRef.current.style.backgroundImage = `url(${forest_image})`
            onload()
        })
        image.src = forest_image
    }, [])


    return(
        <div className='Landing'id = 'Landing-div' ref = {backgroundRef}> 
            <div className='Landing-header-tag' id = {'landing-header'}>
            </div>
            <ScrollDownAnimation />
        </div>
    )
}

export default Landing
