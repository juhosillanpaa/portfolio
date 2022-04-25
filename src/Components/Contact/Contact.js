import React, { useState, useEffect } from 'react'
import { Paragraph } from '../Text'
import { ReactComponent as Phone } from '../../Icons/phone-call.svg'
import { ReactComponent as Email } from '../../Icons/mail.svg'
import { ReactComponent as Linkedin } from '../../Icons/linkedin-app.svg'
import './Contact.css'

const Contact = () => {
    const [copied, setCopied ] = useState(false)

    useEffect(() => {
        let timer
        if (copied){
            timer = setTimeout(() => {
                setCopied(false)
            }, 2000)
        }
        return () => clearTimeout(timer)
    }, [copied])


    const copyEmail = () => {
        navigator.clipboard.writeText('Juhosillanpaa@hotmail.fi')
        setCopied(true)
    }


    return (
        <div className='Contact-container'>
            <div className='Contact-item'>
                <Phone className='Contact-svg' fill = {'white'} stroke = {'white'} />
                <Paragraph text = {'044 978 9096'} />
            </div>

            <div className='Contact-item Contact-link' onClick = {copyEmail}>
                <Email className='Contact-svg' fill = {'white'} stroke = {'white'} />
                <Paragraph text = {'Juhosillanpaa@hotmail.fi'} />
                <div className = {`Contact-copied ${copied ? 'in' : 'out'}`}>
                    <Paragraph text = {'Copied'} />
                </div>
                

            </div>

            <a href = 'https://www.linkedin.com/in/juhosillanpaa' target = '_blank' className='Contact-link'>
                <div className='Contact-item'>
                    <Linkedin className='Contact-svg' fill = {'white'} stroke = {'white'} />
                    <Paragraph text = {'juhosillanpaa'} />
                </div>
            </a>
            
            
        </div>
    )
}
export default Contact