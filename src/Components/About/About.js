import React from 'react'
import Description from '../Description/Description'
import './About.css'
import ScrollDownAnimation from '../ScrollDownAnimation/ScrollDownAnimation'
import Skills from '../Skills/Skills'



const About = ({windowWidth}) => {
    const text = [
        "In my studies and presonal projects I have mostly focused on functional programming and I have experience \
        with machine learning, statistics, algorithmic techniques and optimization. I have also taken slight detour to \
        the wonderful world of web development and I am familiar with frontend development, backend development as well as SQL.",

        "I am most experienced with Frontend development with React. I was the main Frontend developer in my previous employment, where \
        I developed the UI for their predictive maintenance system."
      
    ]


    return (
        <div className='FullPage-Slide'>
           <div className='FullPage-Container'>
               <div className='About'>
                   <div className='About-text-container'>
                      <Description text = {text}/> 
                   </div>
                   
                   <Skills windowWidth = {windowWidth}/>
             
               </div>
            
           </div>
           
           <ScrollDownAnimation />
        </div>
    )
}

export default About