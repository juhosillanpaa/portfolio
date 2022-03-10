import React from 'react'
import './Title.css'

const Title = ({text}) => {
    return (
        <h1 className='Title-text'>
            {text}
        </h1>
    )
}


export default Title