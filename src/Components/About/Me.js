import React from 'react'
import Description from '../Description/Description'
import './Me.css'
import { Paragraph } from '../Text'
import hero_image from '../../images/omakuva/yellow_cropped.png'
import Contact from './Contact'
import ScrollDownAnimation from '../ScrollDownAnimation/ScrollDownAnimation'


const Me = ({config}) => {
    const text = [
        "I am a developer.",
        "",
        "I am studying in Aalto university in Life Science Technology master's programme. \
        For me, the most important thing is being able to solve problems, building new things and being creative. And who doesn't love \
        the instant feedback loop of programming.",
        "",
        "I am looking for a new job, where I can challenge myself, meet likeminded people \
        and learn new skills. Feel free to contact me via email, LinkedIn, WhatsApp or by calling, if you want to \
        ask additional information or schedule meeting.",
        "",
        "Thank you for your interest!"
    ]
    

    return (
        <div className='FullPage-Slide'>
           <div className='FullPage-Container'>
               <div className='Me'>

                   <img src = {hero_image} className = 'Me-hero-image'
                        width = {config.imageW} height = {config.imageH}
                   />
                   <div className='Me-text-container'>
                        {
                            text.map((row, index) => 
                                <div key = {index} className = {index == 0 ? 'first' : ''}>
                                    <Paragraph text={row} />
                                </div>
                            )
                        }
                        <Contact />

                   </div>
             
               </div>
            
           </div>
           <ScrollDownAnimation />
        </div>
    )
}

export default Me