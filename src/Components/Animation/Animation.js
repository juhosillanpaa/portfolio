import React, {useState, useEffect, useRef} from 'react'
import Canvas from '../Canvas/Canvas'
import Point from '../../Classes/Point/Point'
import { getTextPositions} from '../Canvas/pointPositions'
import './Animation.css'



const about_width = 450
const skills_width = 450
const projects_width = 400
const name_width = 860
const iam_width = 270
const welcome_width = 530



const Animation = ({
    windowHeight,
    windowWidth,
    fullHeight,
    page,
    scroll={from:0, to:0},
    paddings, version
}) => {
    const pointRef = useRef({ points: [], animation: 0})
    const [welcome, setWelcome] = useState([])
    const [iam, setIam] = useState([])
    const [name, setName] = useState([])
    const [about, setAbout] = useState([])
    const [projects, setProjects ] = useState([])
    const [skills, setSkills ] = useState([])
    
    useEffect(() => {
        // play correct animation when user scrolls
        playAnimation(scroll.to)
    },[scroll])

    useEffect(() => {
        playAnimation(page)
    },[windowHeight, windowWidth])

    useEffect(() => {
        setWelcome(getTextPositions('template', 'Welcome', 30))
        setIam(getTextPositions('template', "I am", 30))
        setName(getTextPositions('template', 'Juho Sillanpää', 30))
        setName(getTextPositions('template', 'Juho Sillanpää', 30))
        setAbout(getTextPositions('template', 'About me', 30))
        setSkills(getTextPositions('template', 'My Skills', 30))
        setProjects(getTextPositions('template', 'Portfolio', 30))
    },[])

    useEffect(() => {
        if (name.length > 0 && windowHeight > 0 && pointRef.current.points.length === 0){
            pointRef.current.points = createPoints()
            animateWelcome(true)
            console.log('point length: ', name.length )
        }
    },[windowHeight, name])

    const playAnimation = (index) => {
        
        if (index === 0){
            pointRef.current.animation = pointRef.animation == 10 ? 4 : 0
            animateName()
        }else if (index === 1){
            pointRef.current.animation = 10
            AnimateAbout()
        }
        else if (index === 2){
            pointRef.current.animation = 10
            animateSkills()
        }
        else if (index === 3){
            pointRef.current.animation = 10
            animateProjects()
        }
    }
    


    const createPoints = () => {
        let points = []
        for (let i = 0; i <name.length; i++){
            let point = new Point(
                i, 0, 0, 0, [0,0], 3, 'rgba(255,255,255,1)',                  
            )
            points.push(point)
        }
        return points
    }
 

    const stopFunction_target = (p) => {
        let target = p.target
        let d = Math.sqrt((p.x - target[0])**2 + (p.y - target[1])**2)
        if (d < 0.3){
           return true
        }else return false
    }

    const AnimateAbout = () => {
        let x0 = windowWidth * paddings.about_left
        let i = 0
        let y0 = 1 * windowHeight + windowHeight * paddings.about_top
        pointRef.current.points.forEach(point => {
            point.setSize(2)
            let index = i
            if (i >= about.length - 1){
                index = i * 2 % about.length
                point.setExtra()
            }else{
                point.setNormal()
            }
            let target = about[index]
            let x = target[0]*3 + x0
            let y =  target[1]*3 + y0
            point.updateTarget([x,y])
            point.updateStopFunction(stopFunction_target)
            point.activateTargetGravity()
            i++
        })
    }
    

    const animateWelcome = (initializing ) => {
        let y0 = windowHeight * paddings.name_top
        let x0 = windowWidth /2 - welcome_width / 2
        let factor = 4
  
        pointRef.current.points.forEach((point, i) => {
            let index = i
            if (i >= welcome.length){
                index = i * 2 % welcome.length
                point.setExtra()
            }else{
                point.setNormal()
            }
            let [x,y] = welcome[index]
            x = x*factor + x0
            y = y*factor + y0
            if (initializing){
                point.setPosition(x,y)
            }else{
                point.updateTarget([x,y])
            }

        })
    }

    const animateIam = () => {
        let i = 0
        let y0 = windowHeight * paddings.name_top
        let x0 = (windowWidth / 2) - iam_width / 2
        pointRef.current.points.forEach((point,i) => {
            let index = i
            if (i >= iam.length - 1){
                index = i * 2 % iam.length
                point.setExtra()
            }else{
                point.setNormal()
            }
            let target = iam[index]
            let x = target[0]*4 + x0
            let y = target[1]*4 + y0
            point.updateTarget([x,y])
            point.updateStopFunction(stopFunction_target)
            point.activateTargetGravity()
            i++
        })
    }


    const animateSkills = () => {
        const left_padding = windowWidth / 2 - skills_width/2
        let i = 0
        let y0 = 2*windowHeight + windowHeight * paddings.title_top
        pointRef.current.points.forEach(point => {
            if (point.orbitting){
                return point
            }
            point.setSize(2)
            let index = i
            if (i >= skills.length - 1){
                index = i * 2 % skills.length
                point.setExtra()
            }else{
                point.setNormal()
            }
            let target = skills[index]
            let x = target[0]*3 + left_padding
            let y =  target[1]*3 + y0
            point.updateTarget([x,y])
            point.updateStopFunction(stopFunction_target)
            point.activateTargetGravity()
            i++
        })
    }

    const animateProjects = () => {
        const left_padding = (windowWidth / 2) - projects_width/2
        let i = 0
        let y0 = 3*windowHeight + windowHeight * paddings.title_top
        pointRef.current.points.forEach(point => {
            if (point.orbitting){
                return point
            }
            point.setSize(2)
            let index = i
            if (i >= projects.length - 1){
                index = i * 2 % projects.length
                point.setExtra()
            }else{
                point.setNormal()
            }
            let target = projects[index]
            let x = target[0]*3 + left_padding
            let y =  target[1]*3 + y0
            point.updateTarget([x,y])
            point.updateStopFunction(stopFunction_target)
            point.activateTargetGravity()
            i++
        })
    }
    

    const animateName = () => {
        let i = 0
        let y0 = windowHeight * paddings.name_top
        //let x0 = windowWidth * paddings.name_left
        let x0 = (windowWidth / 2) - name_width / 2
        pointRef.current.points.forEach(point => {
            if (point.orbitting){return point}
            point.setSize(3)
            point.setNormal()
            let index = i % name.length
            let target = name[index]
            let x = target[0]*4 + x0
            let y = target[1]*4 + y0
            point.updateTarget([x,y])
            point.updateStopFunction(stopFunction_target)
            point.activateTargetGravity()
            i++
        })
    }



    const draw = (ctx) => {
        let y_0 = Math.min(scroll.from, scroll.to) * windowHeight
        let y_1 = (Math.max(scroll.from, scroll.to) + 1) * windowHeight
        ctx.clearRect(0, y_0, ctx.canvas.width, y_1)
        pointRef.current.points.forEach(point => {
            point.draw(ctx)
        })

    }

const animation = (elapsed) => {
    let ID = pointRef.current.animation
    if (elapsed > 1500 &&  ID == 0){
        pointRef.current.animation = 1
        animateIam()
    }else if (elapsed > 3500 &&  ID == 1){
        pointRef.current.animation = 3
        animateName()
    }
    else if (elapsed > 8000 && [3,4,5,6].includes(ID)){
        let t = elapsed % 8000
        if (ID == 3){
            //possible explosion here
            pointRef.current.animation = 4
        }else if (t > 500 && ID == 4){
            animateIam()
            pointRef.current.animation = 5
        }else if(t > 3000 && ID == 5){
            animateName()
            pointRef.current.animation = 6
        }else if (t < 1000 && ID == 6){
            pointRef.current.animation = 3
        }
    }
}

    const update = (elapsed) => {
        animation(elapsed)
        let sceneUpdated = false
        pointRef.current.points.forEach(point => {
            let updated = point.update(windowWidth, fullHeight)
            if (updated){ sceneUpdated = true}
        })
        return sceneUpdated
    }

    return(
        <div className='Animation'id = 'animation-div'>
            <canvas id = {'template'} className = 'hiddenCanvas' />


            {fullHeight !== 0 && windowWidth !== 0?
                <Canvas width = {windowWidth} height = {fullHeight} draw = {draw} update = {update} ready = {true}/>
                : <></>
            }
        </div>
    )
}

export default Animation