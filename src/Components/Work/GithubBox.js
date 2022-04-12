import React, { useState } from 'react'
import './GithubBox.css'
import { Paragraph } from '../Text'




const ProjectCard = ({svg, text}) => {
    const [ out, setOut ] = useState(false)


    return(
        <div className='GithubBox'
            onMouseLeave = {() => setOut(true)} onMouseEnter={() => setOut(false)}
        >

            <div className= {`GithubBox-overlay ${out ? 'out':''}`}></div>

            <img src = {svg} className = 'GithubBox' />
            <Paragraph text = {text} />
            
        </div>
    )
}

export default ProjectCard