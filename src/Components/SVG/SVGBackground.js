import React, { useState, useEffect, useRef } from 'react'
import './SVGBackground.css'


const about_width = 450

const SVGBackground = ({ fullHeight, windowWidth, windowHeight, paddings }) => {
    const [lines, setLines ]= useState([])
 
    useEffect(() => {
        setLines(createLines(windowHeight, windowWidth))
    },[windowWidth, windowHeight])

    let color = 'rgba(255,255,255,0.6)'

    const createSkillsLines = (wh, ww) => {
        let p = 20
        let y0 = 2 * wh + wh * paddings.description_top + paddings.descH - p
        let y1 = y0 + 2*p + paddings.skillBoxH            
        let box_w = 4 * paddings.skillBoxW     
        let x0 = (ww - box_w) / 2 - p
        let x1 = ww - x0 + p
        let d = 100
        let lines = [
            {x0: x0 - d, x1: x1 + d, y0: y0, y1:y0 },
            {x0: x0 - d, x1: x1 + d, y0: y1, y1: y1 },
            {x0: x0, x1: x0, y0: y0 - d, y1: y1 + d },
            {x0: x1, x1: x1, y0: y0 - d, y1: y1 + d },
        ]
        return lines
    }

    const createHeroFrame = (wh, ww) => {
        let x0 = ww * ( 1 - paddings.image_right) - paddings.imageW
        let x1 = ww * ( 1 - paddings.image_right)
        let y0 = wh + wh / 2 - paddings.imageH / 2
        let y1 = wh + wh / 2 + paddings.imageH / 2

        let lines = []
        lines.push({    //bottom line
            x0: x0 - 300, x1: x1 + 100,
            y0: y1+1 , y1: y1+1 
        })
        lines.push({    // right line ( taller )
            x0: x1, x1: x1 ,
            y0: y0 - 100, y1: y1 + 100
        })
        lines.push({    // left line
            x0: x0 - 1, x1: x0 -1,
            y0: y0 + 200, y1: y1 + 100
        })
        lines.push({        // title bottom line
            x0: paddings.about_left * windowWidth - 100,
            x1: paddings.about_left * windowWidth + about_width + 100,
            y0: paddings.about_top * windowHeight + windowHeight + 150,
            y1: paddings.about_top * windowHeight + windowHeight + 150,
        })
        return lines
    }

    const horizontal_lines = [
        [0.3, 0.7, 2.2],
        [0.3, 0.7, 3.2]
    ]

    

    const createLines = (wh, ww) => {
        let lines = []
        horizontal_lines.forEach(line => {
            const x0 = line[0] * ww
            const x1 = line[1] * ww
            const y = line[2] * wh
            lines.push({ x0: x0, y0: y, x1: x1, y1: y })

        })
        let framelines = createHeroFrame(wh, ww)
        const skills_grid_lines = createSkillsLines(wh, ww)
        let temp = lines.concat(skills_grid_lines).concat(framelines)
        return temp
    }

    return(
        <div className='SVGBackground'>
            <svg height = {fullHeight} width = {windowWidth} >
                {
                    lines.map((item, index) => (
                        <line x1 = {item.x0} x2 = {item.x1} y1 = {item.y0} y2 = {item.y1} key = {index} stroke = {color}/>
                    ))
                }
            </svg>


        </div>
    )

}

export default SVGBackground