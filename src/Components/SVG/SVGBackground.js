import React, { useState, useEffect, useRef } from 'react'
import './SVGBackground.css'


const SVGBackground = () => {
    const [ height, setHeight ] = useState(0)
    const [ width, setWidth ] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    const lineRef = useRef({ lines: [] })

    const x0_list = [100, 200, 380, 690, 1200, 1260, 1600, 2000, 2500, 2600, 3000, 3500, 3720  ]

    useEffect(() => {
        let element = document.getElementById('baseDIV')
        let w= element.clientWidth
        let h = element.offsetHeight
        setWindowHeight(window.innerHeight)
        setHeight(h)
        setWidth(w)
        lineRef.current.lines = createLines()
    },[])
    let color = 'rgb(50,50,50)'

    useEffect(() => {
        let animationFrameId
        const render = () => {
            updateLines()
            animationFrameId = window.requestAnimationFrame(render)
        }
        //render()
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    },[])


    const createLines = () => {
        let angle = 75
        let rad = angle / 180 * Math.PI
        let lines = []
        for (let i = 0; i < x0_list.length; i++){
            let x1 = x0_list[i]
            let y2 = Math.tan(rad) * x1
            lines.push({
                x1: x1, y1: 0, x2: 0, y2: y2
            })
        }
        return lines   
    }

    const updateLines = () => {
        return
        let newLines = lineRef.current.lines.map(line => {
            line.x1 = line.x1 + 1
            return line
        })
        lineRef.current.lines = newLines
    }
    return (
        <div>
            
        </div>
    )
 
    return(
        <div className='SVGBackground'>
            <svg height = {height} width = {width} >

                {
                    lineRef.current.lines.map((item, index) => (
                        <line {...item} key = {index} stroke = {color}/>
                    ))
                }
            </svg>


        </div>
    )

}

export default SVGBackground