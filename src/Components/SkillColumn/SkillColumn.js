import React from 'react'
import './SkillColumn.css'
import { SubTitle, Paragraph } from '../Text'

const SkillColumn = ({title_text, description_text, list_items=[]}) => {
    return (
        <div className='SkillColumn'>
            <SubTitle text = {title_text} />
            <Paragraph text = {description_text} />
            {
                list_items.map((item, index) => {
                    return(
                        <span key = {index}> 
                            <Paragraph text = {item} />
                        </span>
                    ) 
                })
            }
        </div>
    )
}

export default SkillColumn