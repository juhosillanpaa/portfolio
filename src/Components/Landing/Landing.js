import React from 'react'
import './Landing.css'

import cropped from '../../images/omakuva/blue_v3.png'
import yellow from '../../images/omakuva/yellow.png'
import yellow_s from '../../images/omakuva/yellow_shaded.png'


const Landing = () => {

    return(
        <div className=' FullPage-Slide Landing'id = 'Landing-div'>
            <img src = {yellow} className = 'Landing-image' />   
        </div>
    )
}

export default Landing
