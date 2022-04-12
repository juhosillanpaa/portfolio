import React from 'react'
import './Description.css'
import {Paragraph} from '../Text'

const Description = ({text}) => {
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