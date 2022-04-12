import React, {useState} from 'react'
import Chart from './Chart'
import Info from './Info'
import './Timeline.css'
import { data, timeline } from './data'

const og_width = 1400
const og_height = 400

const Timeline = ({config}) => {
    const [active, setActive] = useState(0)
    let items = data
    let time = timeline
    const handleClick = (index) => {
        setActive(index)
    }

    const mapItems = (items, config) => {
        const coef = config.timelineW / og_width
        const coef2 = config.timelineH > 350 ? 1 : 0.75
        console.log('coef: ', coef)
        let mapped = items.map(item => {
            let temp = {
                ...item,
                x: item.x ? Math.floor(item.x * coef) : undefined,
                x1: item.x1 ? Math.floor(item.x1 * coef) : undefined,
                x2: item.x2 ? Math.floor(item.x2 * coef) : undefined,
                height: item.height ? Math.floor(item.height * coef2) : undefined
            }
            return temp
        })
        return mapped
    }
    const mapTimeline = (timeline, config) => {
        const coef = config.timelineW / og_width
        let mapped = timeline.map(item => {
            let temp = {
                ...item,
                x: Math.floor(item.x * coef)
            }
            return temp
        })
        return mapped
    }

    
    return (
        <div className='Timeline'>
            <div className='Timeline-chart-container'>
                <Chart width = {config.timelineW} height = {config.timelineH} 
                    active = {active} handleClick = {handleClick}
                    items = {mapItems(items, config)} 
                    timeline = {mapTimeline(time, config)}
                />
            </div>
            <div className='Timeline-info-container'>
                {data.map((item,index) => 
                    <Info
                        title = {item.text}
                        time = {item.time}
                        text = {item.description}
                        hidden = {active !== index}
                        key = {index}
                        link = {{link: item.link, github: item.github, link_text: item.link_text, github_text: item.github_text}}
                    
                    />
                )}
                
            </div>
        </div>
    )
}
export default Timeline