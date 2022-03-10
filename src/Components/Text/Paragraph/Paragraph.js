import React from 'react'
import './Paragraph.css'

const Paragraph = ({text}) => {
    return (
        <p className='Paragraph-text'>
            {text}
        </p>
    )
}

export default Paragraph