import React from 'react'
import './TooSmall.css'
import { Title, Paragraph } from '../Text'

const TooSmall = () => {

    let text = "Hi, welcome to my page! \n\n \
    Unfortunatedly this page uses fancy stuff that just does not work with small screens. I might do something \
    about this at some point, but I do not believe its worth the hazzle. Please try to check this out with screen \
    that has window width of at least 1200px!"

    return (
        <div className='TooSmall-container'>
            <div className='TooSmall-row'>
                <Title text = 'Oops...' />
            </div>
            <div className='TooSmall-row'>
                <Paragraph text = {text} />
            </div>
            
        </div>
    )
}

export default TooSmall

