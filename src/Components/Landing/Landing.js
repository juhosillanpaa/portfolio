import React, { useEffect } from 'react'
import './Landing.css'

import forest_image from '../../images/forest7.jpg'
import ScrollDownAnimation from '../ScrollDownAnimation/ScrollDownAnimation'


const Landing = ({ onload}) => {

    return(
        <div className=' FullPage-Slide Landing'id = 'Landing-div'>
            <img src = {forest_image} className = 'Landing-background-image' onLoad={onload} alt = 'background forest'/>
            <ScrollDownAnimation />
        </div>
    )
}

export default Landing
