import React, {useState} from 'react'
import Chart from './Chart'
import Info from './Info'
import './Timeline.css'

const items = [
    {
        text: 'Portfolio', x: 100, height: 75, pad: 0, dir: 'up',
        time: '2022 Spring', description: "I made this portfolio to impress you. I have wanted to tinker with pixel animations for a while now\
        and this was the perfect opportunity to do so. I also wanted to stand out from the crowd and do something different when it comes to \
        CV's and boring job applications.\n \
        This page is made with React. The pixel animations are done with requestAnimnationFrame and Canvas and the chart above is made with SVG.\
        "
    },{
        text: 'Dungeon game', x: 250, height: 75, pad: 0, time: '2021 Fall', dir: 'up',
        description: "I quitted my job at Innocode Oy and decided to focus on my studies and figure out what I want to do. \
        During the fall I still wanted to code something and decided to start tinkering procedural map generation algorithms. \
        I decided to go with simple dungeon game where the world is procedurally generated as the user roams in it. I also \
        created some enemies and let the user shoot, which involved figuring out interesting shooter game related mathematics. \
        \nThe game has no storyline or goal as the main purpose was just to tinker with the tools and algorithms, but feel free to check it out!",
        github: 'https://github.com/juhosillanpaa/dungeon_game', link_text: 'Dungeon game'
    },{
        text: 'Portfolio', x: 625, height: 75, pad: 0, dir: 'up',
        time: '2019 Fall', description: "My last portfolio website, that I created after I took some courses about web development. \
        The page itself is pretty awful, but it did its job helping me secure interviews and a job."
    },{
        text: 'React project', x: 690, height: 50, pad: 0, dir: 'up',
        time: '2019 Fall', description: "After the FullStack course I wanted to try building something myself. My goal was to create \
        Tinder-like app, but where you can find new friends. I believe that there are a lot of people who, for example, are \
        starting new hobby, but have no friends who are interested in it, and therefore they could use app like this for finding new buddies. \
        The project never got finished because I started working at Innocode Oy and had no more time to work with it. However, it was nice \
        learning experience."
    },{
        text: 'MOOC: Fullstack', x: 750, height: 125, pad: 0, dir: 'up',
        time: '2019 Spring', description: "I took the Fullstack course from MOOC. \
        The course sparked my interest towards web development.",
        link: 'https://fullstackopen.com/', link_text: 'https://fullstackopen.com'
    },{
        text: 'Tower defence', x: 1150, height: 75, pad: 0, time: '2017 Spring', dir: 'up',
        description: "My first programming project! I made a tower defence game as part of one of my first Python programming courses. \
        Since I started my studies I have been somewhat obsessed with programming. In a way it has lead to some difficulties \
        along the road, as I used to select next year programming courses to my calendar, instead of the more boring basic studies.\
        And as the saying goes: what goes around, comes around, which I learned the hard way."
    },{
        text: 'Innocode Oy', x1: 600, x2: 250, dir:'down', time: '2020 Spring - 2021 Fall',
        description: 'I worked in Innocode Oy for one and half years. I worked mainly with their predictive maintenance system \
        and was the only Frontend developer in that project. I learned a lot and got a lot of experience especially with data \
        visualization. The standard data visualization libraries were rarely sufficient so I learned how to make own plots with \
        tools like Canvas, SVG and WebGL.\nI also learned a lot about designing pages and components as we needed to display a lot \
        of information in a clear and organized manner.'
    },{
        text: 'Jysk Oy', x1: 895, x2: 700, dir:'down', time: '2018 Summer - 2019 Fall',
        description: 'I worked in Jysk Oy as part time employer along with school.'
    },{
        text: 'Military service', x1: 1100, x2: 905, dir:'down', time: '2017 Summer - 2018 Summer',
        description: 'I served one year in military and went through Reserve officer training.'
    },{
        text: 'Jysk Oy', x1: 13501, x2: 1110, dir: 'down', time: '2015 Fall - 2017 Summer',
        description: 'I worked in Jysk Oy as part time employer along with school.'
    }

]

const work = [
   
]




const Timeline = ({}) => {
    const [active, setActive] = useState(0)

    const onHover = (index) => {
        setActive(i => i != index ? index : i)
    }
    const getActiveItem = () => {
        return items[active]
    }
    
    let activeItem = getActiveItem()
    const handleClick = (index) => {
        setActive(index)
    }
    
    return (
        <div className='Timeline'>
            <div className='Timeline-chart-container'>
                <Chart width = {1400} height = {450} handleClick = {handleClick}
                    items = {items} active = {active}
                />
            </div>
            <div className='Timeline-info-container'>
                {items.map((item,index) => 
                    <Info
                        title = {item.text}
                        time = {item.time}
                        text = {item.description}
                        hidden = {active !== index}
                        key = {index}
                        link = {{link: item.link, github: item.github, text: item.link_text}}
                    />
                )}
                
            </div>
        </div>
    )
}
export default Timeline