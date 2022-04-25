import React from 'react'
import './Header.css'

const Header = ({id}) => {
    return (
        <div className='Header-container'>
            <div className='Header-tag' id = {id}>
            </div>
        </div>
    )
}

export default Header