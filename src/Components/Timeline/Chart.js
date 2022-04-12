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

    const endCircleR = 15
    const endCirclePad = 10

    let finalX = timeline[timeline.length - 1].x
    let startX = timeline[0].x
    
    const mainLine = {x1: startX, x2: finalX}
    //const mainLine = {x1: 100, x2: width }
    const startCircleX = mainLine.x1 - endCircleR - endCirclePad
    const endCircleX = mainLine.x2 + endCircleR + endCirclePad

   const rotate = height > 350 ? true : false



    return (
        <div className='Chart-container'>
            <svg width = {width} height = {height}>
                <g>
                    <circle cx = {startCircleX} cy = {y} r = {endCircleR} stroke = 'white' fill = 'transparent' strokeWidth={0.5}/>
                    <line x1 = {mainLine.x1} x2 = {mainLine.x2} y1 = {y} y2 = {y} stroke= 'white' strokeWidth={2}/>
                    {/*<circle cx = {endCircleX} cy = {y} r = {endCircleR} stroke = 'white' fill = 'transparent' strokeWidth={0.5}/>
                        */}
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
                    <rect x = {0} width = {mainLine.x2} y = {0} height = {height} fill = {'white'} />
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
                                <line x1 = {item.x1-1} x2 = {item.x2 + 1}
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