import React, { useState } from 'react'
import './GithubLink.css'
import { Paragraph } from '../../Components/Text'
import { ReactComponent as Icon } from '../../images/github.svg'



const ProjectCard = ({text, link}) => {
    const [ out, setOut ] = useState(false)

    return(
        <a href = {link} target = '_blank'  className='GithubLink'>
            <Icon className='GithubLink-icon'/>
            <Paragraph text = {text} />
        </a>
    )
}

export default ProjectCard