import React from 'react'
import { SubTitle, Paragraph } from '../Text'
import './ToolColumn.css'


const ToolColumn = ({tools}) => {

    return (
        <div className='ToolColumn'>
              {
                tools.map((item, index) => {
                    return(
                        <div className='Tool' key = {index}> 
                            <Paragraph text = {item} />
                        </div>
                    ) 
                })
            }
        </div>
    )

}
export default ToolColumn