import React from 'react'
import './Chart.css'




const Chart = ({width, height, items, timeline, handleClick, active }) => {
    const y = height * 0.6
    const yearR = 5
    const yearTextPad = 20

    const hoverR = 35
    const linePad = 10
    const projectTextPad = 30
    const workTextPad = 40

    const endCircleR = 12
    const endCirclePad = 10
    let spacing = endCirclePad + endCircleR 

    let finalX = timeline[timeline.length - 1].x 
    let startX = timeline[0].x + spacing
    let mainLine = {x1: startX, x2: finalX - endCirclePad - 2* endCircleR}

    const endCircleX = mainLine.x2 + spacing  - 1

   const rotate = false //height > 350 ? true : false

   



    return (
        <div className='Chart-container'>
            <svg width = {width} height = {height}>
                <g>
                    <circle cx = {endCircleX} cy = {y} r = {endCircleR} stroke = 'white' fill = 'transparent' strokeWidth={0.5}/>
                    <line x1 = {mainLine.x1} x2 = {mainLine.x2} y1 = {y} y2 = {y} stroke= 'white' strokeWidth={2}/>
                </g>
               
                {timeline.map((item,index) =>
                    <g key = {index}>
                        { item.text != '' ? <circle cx = {item.x} cy = {y} r = {yearR} fill = {'white'} /> : <></> }
                        <text x = {item.x} y = {y - yearTextPad} fill = {'white'} textAnchor = {'middle'}>
                            {item.text}
                        </text>
                    </g>
                )}
                <mask id = 'mymask'>
                    <rect x = {spacing} width = {width} y = {0} height = {height} fill = {'white'} />
                </mask>

                {items.map((item, index) => 
                    <g key = {index} mask = "url(#mymask)" onClick = {() => handleClick(index)}
                        className = {`SVG-itemgroup ${index == active ? 'active' : ''}`}
                    >
                        {item.dir == 'up' ? 
                            <>
                                <line className='SVG-ProjectLine'
                                    x1 = {item.x} x2 = {item.x}
                                    y1 = {y - item.height} y2 = {y - linePad - item.pad}
                                />
                                <circle cx = {item.x} cy = {y - item.height - projectTextPad} r = {hoverR}
                                    stroke = {'transparent'} fill = {'transparent'}/>

                        
                                <text x = {item.x} y = { y - item.height - projectTextPad}
                                    textAnchor = {'middle'}
                                    transform = {rotate ? `rotate(-30, ${item.x}, ${y-item.height - projectTextPad})` : ''}
                                >
                                    {item.text}
                                </text>
                            </>
                            :
                            <>
                                <line x1 = {item.x1} x2 = {item.x1} y1 = {y + linePad} y2 = {y + item.height}
                                    className = 'SVG-WorkLine'
                                />
                                <line x1 = {item.x2} x2 = {item.x2} y1 = {y + linePad} y2 = {y + item.height}
                                    className = 'SVG-WorkLine'
                                />
                                <line x1 = {item.x1+1} x2 = {item.x2 - 1}
                                    y1 = {y + item.height -1} y2 = {y + item.height -1}
                                    className = 'SVG-WorkLine'
                                />
                                <circle cx = {(item.x1 + item.x2) / 2} cy = {y + item.height + workTextPad} r = {hoverR}
                                    stroke = {'transparent'} fill = {'transparent'}/>
                                <text x = {(item.x1 + item.x2) / 2} y = {y + item.height + workTextPad}
                                    fill = {'white'} textAnchor = {'middle'}>
                                    {item.text}
                                </text>
                            </>
                        }
                    </g> 
                )}
            
            </svg>
        </div>
    )
}
export default Chart