import React from 'react'
import {Title, SubTitle, Paragraph } from '../Text'
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

            {
                link.link != undefined ?

                <div className='Info-link-container'>
                    <a href = {link.link} target = '_blank' className='Info-link'>
                        <Paragraph text = {link.text} />
                    </a>
                </div>
                : <></>
            }{
                link.github !== undefined ?
                    <div className='Info-link-container'>
                        <GithubLink text = {link.text} link = {link.github} />
                    </div>
                : <></>
            }

        </div>
    )
}
export default Info