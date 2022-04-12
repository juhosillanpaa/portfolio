import React from 'react'
import './Card.css'
import { SubTitle, Paragraph } from '../Text'

const largeScreen = 1600


const Card = ({timerange, title, description, short, image, windowWidth}) => {

    return(
        <div className='Card' >
            <img src = {image} alt = 'card image' className='Card-image'/>

            <div className='Card-overlay'>
                    <div className='Card-time'>
                        <Paragraph text = {timerange} />
                    </div>
                    <div className='Card-title'>
                        <SubTitle text={title} />
                    </div>
                
                    <div className='Card-description'>
                        <Paragraph text={windowWidth >= largeScreen ? description : short}/>
                    </div>


                    <div className={`Card-btn`}>
                    see more
                    </div>
            </div>
            
        </div>
    )
}

export default Card