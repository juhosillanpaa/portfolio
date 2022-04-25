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

const Skills = ({ config }) => {

    let tools = [
        'Python', 'C++', 'Javascript', 'Node.js', 'HTML5', 'CSS', 'React', 'R', 'Matlab', 'SQL', 'NoSQL',
        'API','Canvas', 'WebQL', 'D3.js', 'Redux', 'GraphQl', 'TensorFlow', 'PyTorch',
        'Git'
    ]        
    let d = config.skillBoxPad
    let width = 2 * d + 4 * config.skillBoxW
    let height = config.skillBoxH + 2 * d

    const getFrameLines = (width, height) => {
        let lines = [
            { x0: 0, x1: width, y0: d - 1, y1: d - 1 },                         //top
            { x0: 0, x1: width, y0: height - d + 1, y1: height - d + 1},        //bottom
            { x0: d - 1, x1: d - 1, y0: 0, y1: height },                        //left
            { x0: width - d, x1: width - d, y0: 0, y1: height }                 //right
        ]
        return lines
    }

    let lines = getFrameLines(width, height)


    return (
        <div className = 'Skills'>
            <svg width = {width} height = {height} >
                {lines.map((item, index) => 
                    <line
                        x1 = {item.x0}
                        x2 = {item.x1}
                        y1 = {item.y0}
                        y2 = {item.y1}
                        key = {index}
                        stroke = {'white'}
                    />
                )}
                <foreignObject x = {d} y = {d} width = { 4 * config.skillBoxW} height = {config.skillBoxH} >
                    <div className='Skills-box'>
                        <SkillBox title_text={'Web Development'} svg_icon = {se_icon} headerMode = {config.skillBoxText} />
                        <SkillBox title_text={'Data Visualization'} svg_icon = {dv_icon} headerMode = {config.skillBoxText} />
                        <SkillBox title_text={'General Programming'} svg_icon = {cs_icon} headerMode = {config.skillBoxText} />
                        <SkillBox title_text={'Machine Learning'} svg_icon = {ai_icon} headerMode = {config.skillBoxText} />
                    </div>
                </foreignObject>
            </svg>
            <ToolColumn tools = {tools} />
        </div>

    )
}

export default Skills