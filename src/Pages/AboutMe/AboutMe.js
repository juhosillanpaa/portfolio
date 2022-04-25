import React from 'react'
import './AboutMe.css'
import { Paragraph } from '../../Components/Text'
import hero_image from '../../images/omakuva/yellow_cropped.png'
import Contact from '../../Components/Contact/Contact'
import Header from '../../Components/Header/Header'

const AboutMe = ({config}) => {
    const text = [
        "I am a developer.",
        "",
        "I am studying in Aalto university in Life Science Technology master's program. \
        For me, the most important thing is being able to solve problems, building new things and being creative. And who doesn't love \
        the instant feedback loop of programming.",
        "",
        "I am looking for a new job, where I can challenge myself, meet likeminded people \
        and learn new skills. Feel free to contact me via email, LinkedIn, WhatsApp or by calling, if you want to \
        ask additional information or schedule meeting.",
        ""
    ]
    const createHeroFrame = (w, h, pad) => {
        let lines = []
        lines.push({ x0:0, x1:w, y0: h - pad + 1, y1: h - pad + 1 })    //bottom
        lines.push({ x0: w - pad + 1, x1: w - pad + 1, y0: 0, y1: h })  //right
        lines.push({ x0: 2 * pad - 1, x1: 2 * pad - 1, y0: config.imageH * 0.3 + pad, y1: h })       //left
        return lines
    }

  
    let pad = config.imagePad

    const imageX = pad * 2
    const imageY = pad

    let width = config.imageW + 3 * pad
    let height = config.imageH  + 2 * pad

    const lines = createHeroFrame(width, height, pad)

    let style = {
        height: height,
        width: width
    }
    return (
        <div className='Me'>
            <Header id = {'aboutme-header'} />
            <div className='Me-content'>

                <div className='Me-text-container'>
                    <div className='Me-text'>
                        {text.map((row, index) => (
                            <div key = {index} className = {index == 0 ? 'first' : ''}>
                                <Paragraph text={row} />
                            </div>
                            ))
                        }
                        <Contact />
                    </div>
                </div>

                <div className='Me-image-container' style = {style}> 
                    <svg width = {width} height = {height}>
                        {
                            lines.map((item, index) => (
                                <line
                                    x1 = {item.x0}
                                    x2 = {item.x1}
                                    y1 = {item.y0}
                                    y2 = {item.y1}
                                    key = {index}
                                    stroke = {'white'}/>
                            ))
                        }
                        <foreignObject x = {imageX} y = {imageY} width = {config.imageW} height = {config.imageH}>
                            <img src = {hero_image} className = 'Me-hero-image'
                                width = {config.imageW} height = {config.imageH}
                            />
                        </foreignObject>
                    </svg>
                </div>
 
            </div>
        </div>
    )
}

export default AboutMe