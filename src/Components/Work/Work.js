import React from 'react'
import './Work.css'
import { Title } from '../Text'
import ProjectCard from '../ProjectCard/ProjectCard'
import ML_image from '../../images/ML.jpg'
import Dungeon_image from '../../images/dungeon.png'

const Work = () => {


    return (
        <div className='Work'>
            <Title text = {'Projects'} />
            <div className='Work-cardContainer'>
                <ProjectCard timerange={'2020 - 2021'}
                    title={'Machine Learning project'}
                    description={'Some random stuff.'}
                    image={ML_image}
                />
                <ProjectCard timerange={'2021'}
                    title={'Game project'}
                    description={'Experimenting with procedural map generation and shooter-games related mathematics'}
                    image={Dungeon_image}
                />
            </div>
            
        </div>
    )
}

export default Work