import React from 'react'
import './Description.css'
import {Title, Paragraph} from '../Text'

const Description = (props) => {
    return (
        <div className = 'Description'>
            <Title text = "Who am I?" />
            <Paragraph
                text = {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec risus eleifend, efficitur metus sed, porta ex. Integer aliquam erat consequat elit pulvinar tincidunt. Maecenas vitae quam lobortis, imperdiet leo id, faucibus justo."}
            />
         
        </div>
    )
}

export default Description