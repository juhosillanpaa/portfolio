import React, {useEffect, useState} from 'react'
import { SubTitle, Paragraph } from '../../Components/Text'
import './Info.css'
import GithubLink from './GithubLink'


const Link = ({link, small}) => {
    return (
        <div className={`Info-link-container ${small ? 'small' : 'large'}`}>
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
    )
}


const Info = ({title, time, text, hidden = false, link,}) => {

    return (
        <div className={`Info-container ${ hidden ? 'hidden':'visible'}`}>
            <div className='Info-header-container'>
                <SubTitle text = {title} />
                <div className='Info-timerange'>
                <Paragraph text = {'- ' + time} /> 
                </div>
                <Link link = {link} small = {true}/>
            </div>
            
            <Paragraph text = {text} />
            <Link link = {link} small = {false}/>

        </div>
    )
}
export default Info