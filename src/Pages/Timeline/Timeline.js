import React, {useState} from 'react'
import Chart from '../../Components/TimelineChart/Chart'
import Info from '../../Components/TimelineInfo/Info'
import './Timeline.css'
//import { data, timeline } from './data'
import { newdata, newtimeline } from './newdata'
import Header from '../../Components/Header/Header'


const og_width = 1400
const og_height = 400

const Timeline = ({config}) => {
    const [active, setActive] = useState(0)

    const handleClick = (index) => {
        setActive(index)
    }

    const mapNewData = (timeline, data, config) => {
        let startX = timeline[0].x
        let startY = timeline[timeline.length - 1].x
        let dx = startY - startX
        let coef = config.timelineW / dx
        const coef2 = config.timelineH > 350 ? 1 : 0.75
        let mapped = data.map(item => {
            let temp = {
                ...item,
                x: item.x ? Math.floor((item.x - startX) * coef) : undefined,
                x1: item.x1 ? Math.floor((item.x1 - startX) * coef) : undefined,
                x2: item.x2 ? Math.floor((item.x2 - startX) * coef) : undefined,
                height: item.height ? Math.floor(item.height * coef2) : undefined
            }
            return temp
        })
        let mappedTimeline = timeline.map(item => {
            let temp = {
                ...item,
                x: Math.floor((item.x - startX) * coef)
            }
            return temp
        })
        return [mappedTimeline, mapped]
    }
    /*
    const mapItems = (items, config) => {
     
        const coef = config.timelineW / og_width
        const coef2 = config.timelineH > 350 ? 1 : 0.75
        let mapped = items.map(item => {
            let temp = {
                ...item,
                x: item.x ? Math.floor((item.x) * coef) : undefined,
                x1: item.x1 ? Math.floor((item.x1) * coef) : undefined,
                x2: item.x2 ? Math.floor(( item.x2) * coef) : undefined,
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
                x: Math.floor(( item.x) * coef)
            }
            return temp
        })
        return mapped
    }

    */
    let [ timeline, data ] = mapNewData(newtimeline, newdata, config)

    
    return (
        <div className='Timeline'>
            <Header id = {'timeline-header'}/>

            <div className='Timeline-chart-container'>
                <Chart width = {config.timelineW} height = {config.timelineH} 
                    active = {active} handleClick = {handleClick}
                    items = {data} 
                    timeline = {timeline}
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