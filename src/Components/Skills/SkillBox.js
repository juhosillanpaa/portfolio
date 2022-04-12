import React from 'react'
import './SkillBox.css'
import { SubTitle } from '../Text'

const SkillColumn = ({title_text, description_text, svg_icon}) => {
    return (
        <div className='SkillBox'>
    
            <img src = {svg_icon} className = 'svg_icon'/>
            
            <SubTitle text = {title_text} />

        </div>
    )
}

export default SkillColumn