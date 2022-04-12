import React, { useEffect } from 'react'
import './Landing.css'
import hero_image from '../../images/omakuva/yellow_cropped.png'
import forest_image from '../../images/forest7.jpg'
import ScrollDownAnimation from '../ScrollDownAnimation/ScrollDownAnimation'


const Landing = ({version}) => {

    return(
        <div className=' FullPage-Slide Landing'id = 'Landing-div'>
            <div className='box'></div>
            { version == 2 ? 
                <img src = {forest_image} className = 'Landing-background-image'/>
                :
                <img src = {hero_image} className = 'Landing-image' />
            }
            <ScrollDownAnimation />
        </div>
    )
}

export default Landing
