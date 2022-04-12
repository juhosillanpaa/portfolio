import React from 'react'
import './Work.css'
import ProjectCard from '../ProjectCard/ProjectCard'
import Dungeon_image from '../../images/dungeon.png'
import innocode_img from '../../images/innocode.jpg'
import radar_img from '../../images/radar.png'
import { Paragraph } from '../Text'
import Description from '../Description/Description'
import { ReactComponent as Icon } from '../../images/github.svg'
import Card from '../ProjectCard/Card'



const Work = ({windowWidth}) => {

    const portfolio_list = [
        {
            timerange:'2022 (ongoing)',
            title: 'Gesture prediction',
            short: 'Woking with gesture prediction project in Aalto University',
            description: 'I am currently working with gesture prediction project, as part of a project course. '
                + 'The task that I have is to improve the preprocessing tools and merging point clouds from multiple radars. '
                + 'The project will also include developing and testing machine learning algorithms to predict the gestures from the merged point clouds.',
            tools: 'Python, Machine Learning',
            image: radar_img
        },{
            timerange: '2021',
            title: 'Dungeon Game project',
            short: 'Personal game project where I experimented with procedural map generation and vector mathematics.',
            description: 'Personal game project where I experimented with procedural map generation and shooter-game related mathematics. '
                + 'I wanted to tinker with procedural algorithms and created a dungeon styled map where the player can roam. '
                + 'In order to experiment with shooting game related mathematics, the player has a gun and he can shoot at enemies that spawn (procedurally) around the world. '
                + 'The next step in some future project is to create something similar in 3D world.',
            tools: 'Python',
            image: Dungeon_image
        },{
            timerange: '2019 - 2021',
            title: 'Innocode',
            short: 'I worked as Frontend developer in Innocode with predictive maintenance-system.',
            description: 'I worked at Innocode as main (and only) Frontend developer in their predictive maintenance-system. '
                + 'The job included designing and developing the whole user interface for displaying different information and statistics from multiple devices. '
                + 'I got familiar with different data visualization tools such as D3.js, canvas, svg and webGL, since standard plotting libraries were insufficient for many tasks.',
            tools: 'React',
            image: innocode_img
        }
    ]
    const text = [
        'Here are some of my most recent and relevant projects as well as my previous work experience in related fields.',
        'More information about my other projects can be found from my github pages. '
    ]

    const openGithubProfile = () => {
        window.open('https://github.com/juhosillanpaa')
    }


    return (
        <div className='Work'>
            <div className='Work-text-container'>
                <Description text = {text} />
            </div>
            
            

            <div className='Work-cardContainer'>
                {
                    portfolio_list.map((item, index) => (
                        <Card {...item} key = {index} windowWidth = {windowWidth} />
                    ))
                }
    
            </div>
            <div className='Work-github'>
                <div className = 'Work-github_box' onClick = {openGithubProfile}>
                    <Icon fill = 'white' className='Work-icon'/>
  
                    <Paragraph text = {'Personal Git'} />
                </div>
  
            </div>
            
        </div>
    )
}

export default Work