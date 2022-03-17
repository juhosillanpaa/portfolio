import React from 'react'
import Description from '../Description/Description'
import './About.css'
import { Paragraph } from '../Text'
import Skills from '../Skills/Skills'



const About = () => {
    

    return (
        <div className='FullPage-Slide'>
           <div className='FullPage-Container'>
               <div className='About'>
                   <div className='test'></div>
                   <Description />
                   <Skills />
               </div>
            
           </div>
                
        </div>
    )
}

export default About