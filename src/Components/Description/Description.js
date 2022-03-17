import React from 'react'
import './Description.css'
import {Title, Paragraph} from '../Text'

const Description = (props) => {
    const text = [
        'asasdasda',
        'asdasdasd'
    ]




    return (
        <div className = 'Description'>
            {
                text.map((line, index) => (
                    <Paragraph
                        key = {index}
                        text = {line}
                    />
                ))
            }
            
         
        </div>
    )
}

export default Description