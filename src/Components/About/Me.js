import React from 'react'
import Description from '../Description/Description'
import './Me.css'
import { Paragraph } from '../Text'
import hero_image from '../../images/omakuva/yellow_cropped.png'

const Me = () => {
    const text = [
        "I am a developer.",
        "",
        "I am studying in Aalto university in Life Science Technology master's programme. \
        For me the most important part is being able to solve problems, building new things and being creative, and programming \
        is just a tool for doing it.",
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
                   <img src = {hero_image} className = 'Me-hero-image' />
                   <div className='Me-text-container'>
                        {
                            text.map((row, index) => 
                                <div key = {index} className = {index == 0 ? 'first' : ''}>
                                    <Paragraph text={row} />
                                </div>
                            )
                        }
                   </div>
             
               </div>
            
           </div>
                
        </div>
    )
}

export default Me