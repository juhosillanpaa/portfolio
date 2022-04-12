import React from 'react'
import { SubTitle, Paragraph } from '../Text'
import './Info.css'
import GithubLink from './GithubLink'


const Info = ({title, time, text, hidden = false, link,}) => {

    return (
        <div className={`Info-container ${ hidden ? 'hidden':'visible'}`}>
            <SubTitle text = {title} />
            <div className='Info-timerange'>
               <Paragraph text = {'- ' + time} /> 
            </div>
            
            <Paragraph text = {text} />
            <div className='Info-link-container'>
            {
                link.link != undefined ?
                    <a href = {link.link} target = '_blank' className='Info-link'>
                        <Paragraph text = {link.link_text} />
                    </a>
                
                : <></>
            }{
                link.github !== undefined ?
                    
                        <GithubLink text = {link.github_text} link = {link.github} />
                    
                : <></>
            }
            </div>

        </div>
    )
}
export default Info