import React from 'react'
import { Title } from '../Text'
import SkillColumn from '../SkillColumn/SkillColumn'
import SkillBox from './SkillBox'
import './Skills.css'
import se_icon from './icons/software-engineering.svg'
import cs_icon from './icons/computer-engineering.svg'
import ai_icon from './icons/artificial-intelligence-ai.svg'
import ToolColumn from './ToolColumn'
import dv_icon from './icons/dashboard-monitoring.svg'

const Skills = (props) => {

    let tools = [
        'Python', 'C++', 'Javascript', 'Node.js', 'HTML5', 'CSS', 'React', 'R', 'Matlab', 'SQL', 'NoSQL',
        'API','Canvas', 'WebQL', 'D3.js', 'Redux', 'GraphQl', 'TensorFlow', 'PyTorch',
        'Git'
    ]

    return (
        <div className = 'Skills'>
            <div className='Skills-box'>
                <SkillBox
                    title_text={'Web Development'}
                    svg_icon = {se_icon}
                />
                <SkillBox
                    title_text={'Data Visualization'}
                    svg_icon = {dv_icon}
                />
                <SkillBox
                    title_text={'General Programming'}
                    svg_icon = {cs_icon}
                />
                <SkillBox
                    title_text={'Machine Learning'}
                    svg_icon = {ai_icon}
                />


            </div>
            <ToolColumn tools= {tools} />

        </div>

    )
}

export default Skills