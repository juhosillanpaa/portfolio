import React from 'react'
import './MySkills.scss'
import Skills from '../../Components/Skills/Skills'
import { Paragraph } from '../../Components/Text'
import Header from '../../Components/Header/Header'

const MySkills = ({config}) => {
    const text = [
        "In my studies and presonal projects I have mostly focused on functional programming and I have experience \
        with machine learning, statistics, algorithmic techniques and optimization. I have also taken a detour to \
        the wonderful world of web development and I am familiar with frontend development, backend development as well as SQL.",

        "I am most experienced with Frontend development with React. I was the main Frontend developer in my previous employment, where \
        I developed the UI for their predictive maintenance system."
      
    ]


    return (
        <div className='MySkills'>
            <Header id = {'skills-header'} />
            
            <div className='MySkills-text-container'>

                <div className='MySkills-text'>
                    {text.map((row, index) => 
                        <div key = {index}>
                            <Paragraph text={row} />
                        </div>
                    )}
                </div>
            </div>
            <div className='MySkills-skills-container'>
                <Skills config = {config} />
            </div>
            
        
        </div>
    )
}

export default MySkills