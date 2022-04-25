import React from 'react'
import './SkillBox.css'
import { Paragraph, SubTitle } from '../Text'

const SkillColumn = ({title_text, svg_icon, headerMode}) => {
    return (
        <div className='SkillBox'>
    
            <img src = {svg_icon} className = 'svg_icon'/>
            {
                headerMode === 1 ?
                <SubTitle text = {title_text} />
                : <Paragraph text = {title_text} />
            }
            

        </div>
    )
}

export default SkillColumn