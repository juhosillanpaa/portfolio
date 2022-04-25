import React from 'react'
import './Paragraph.scss'

const Paragraph = ({text}) => {
    const splitted = text != undefined ? text.split('\n') : [text]

    return (
        <div>
        {splitted.map((str, index) => 
            <p className='Paragraph-text' key = {index}>
            {str}
            </p>
        )}
        </div>
    )
}

export default Paragraph