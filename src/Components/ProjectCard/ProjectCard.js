import React, { useState } from 'react'
import './ProjectCard.css'
import { SubTitle, Paragraph } from '../Text'




const ProjectCard = ({timerange, title, description, image}) => {
    const [ out, setOut ] = useState(false)

    const style = {
        backgroundImage: `url(${image})`
    }
    const showbtn = false

    return(
        <div className='ProjectCard' style={style}
            onMouseLeave = {() => setOut(true)} onMouseEnter={() => setOut(false)}
        >

            <div className= {`ProjectCard-overlay ${out ? 'out':''}`}></div>

            <div className='ProjectCard-content'>
                    <div className='ProjectCard-time'>
                    <Paragraph text = {timerange} />
                </div>
                <div className='ProjectCard-title'>
                    <SubTitle text={title} />
                </div>
                
                <div className='ProjectCard-description'>
                    <Paragraph text={description}/>
                </div>

                {   showbtn ?
                    <div className={`ProjectCard-btn ${out ? 'out':''}`}>
                    see more
                    </div>
                    : <></>
                }
            </div>
            
        </div>
    )
}

export default ProjectCard