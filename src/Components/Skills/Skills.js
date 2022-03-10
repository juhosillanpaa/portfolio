import React from 'react'
import { Title } from '../Text'
import SkillColumn from '../SkillColumn/SkillColumn'
import './Skills.css'

const Skills = (props) => {
    return (
        <div className = 'Skills'>
            <Title text = {'Skills'} />
            <div className='Skills-box'>
                <SkillColumn
                    title_text={'Web Development'}
                    description_text={'I enjoy designing and developing websites.'}
                    list_items={['React', 'HTML', 'JS', 'CSS']}
                />
                <SkillColumn
                    title_text={'General Programming'}
                    description_text={'Solving problems by coding is my passion!'}
                    list_items={['Python','C++','R','SQL']}
                />
                <SkillColumn
                    title_text={'Machine Learning'}
                    description_text = {'something super duper smart about machine learning!'}
                    list_items={['Tensorflow', 'PyTorch']}
                />
            </div>
        </div>

    )
}

export default Skills