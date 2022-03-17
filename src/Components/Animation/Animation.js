import React, {useState, useEffect, useRef} from 'react'
import Canvas from '../Canvas/Canvas'
import Point from '../../Classes/Point/Point'
import { getTextPositions } from '../Canvas/textPositions'
import './Animation.css'


const about_top_padding = 100
const about_width = 450
const name_top_padding = 600
const name_left_padding = 150
const imageSize = 750
const image_right_padding = 300
const image_bot_padding = 200


const gravity = 0.1
const CLOSE_D = 0.05

const createPointsAtPositions = (positions) => {
    let points = []
    for (let i = 0; i <positions.length; i++){
        let [x,y] = positions[i]
        x = x*3 + name_left_padding
        y = y*3 + name_top_padding
        let point = new Point(
            i, x, y, 0, [0,0], 2, 'rgba(255,255,255,1)',                  
        )
        points.push(point)
    }
    return points
}
const createOrbitPoints = (centerX, centerY) => {
    let points = []
    let num = 6
    let r = 450
    for (let i = 0; i < num; i++){
        let angle = i * Math.PI * 2 / num
        let index = ((i + 1) % num) 
        let point = createOrbitPoint(i , [centerX, centerY], angle, r, [index] )
        points.push(point)
    }
    for (let i = 0; i < num; i++){
        let angle = (i * Math.PI * 2 / num ) + 0.2
        let index = num + ((i + 1) % num) 
        let point = createOrbitPoint(i + num, [centerX, centerY], angle, r, [index] )
        points.push(point)
    }
    return points
}

const createOrbitPoint = (id, center, angle, r, connectTo) => {
    let x = center[0] + r * Math.cos(angle)
    let y = center[1] + r * Math.sin(angle)
    let point = new Point(
        id,x,y, 0.3, [0,0], 2, 'white'
    )
    point.startOrbitting(center, angle, r)
    point.updateStopFunction(() => {return false})
    point.connectTo(connectTo)
    return point
}





const Animation = ({ playDropAnimation, replayNameAnimation, page }) => {
    const pointRef = useRef({ points: [], orbitPoints: [] })
    const lineRef = useRef({ lines: [] })
    const [ height, setHeight ] = useState(0)
    const [ width, setWidth ] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    const [name, setName] = useState([])
    const [about, setAbout] = useState([])


    const y0 = page * windowHeight
    const y1 = y0 + windowHeight*2
    //const 

    useEffect(() => {
        let nameP = getTextPositions('template', 'Juho Sillanpää', 40)
        setName(nameP)
        let aboutP = getTextPositions('template', 'About me', 30)
        setAbout(aboutP)
        pointRef.current.points = createPointsAtPositions(nameP)
        pointRef.current.orbitPoints = createOrbitPoints()  
    },[])

    useEffect(() => {
        let element = document.getElementById('baseDIV')
        let wh = window.innerHeight
        let h = element.offsetHeight
        let w = element.clientWidth
        setWindowHeight(wh)
        setHeight(h)
        setWidth(w)

        lineRef.current.lines = createHorizontalLines(wh, w)
        const orbitCenterX = w - imageSize/2 - image_right_padding
        const orbitCenterY = wh - imageSize/2 - image_bot_padding
        pointRef.current.orbitPoints = createOrbitPoints(orbitCenterX, orbitCenterY)
    },[])

    useEffect(() => {
        if (playDropAnimation){
            activateDropAnimation()
        }
    },[playDropAnimation])


    useEffect(() => {
        if (replayNameAnimation){
            reActivateNameAnimation()
        }
    },[replayNameAnimation])


    const createHorizontalLines = (height, width) => {
        let lines = []
        for( let i = 0; i < 10; i++){
            const y0 = Math.random() * height
            const y1 = y0
            const x0 = Math.random() * width
            const x1 = x0 + (Math.random() * 600) + 400
            lines.push({ x0: x0, y0: y0, x1: x1, y1: y1 })
        }
        return lines
    }

    const updateLines = () => {
        return
        let newLines = lineRef.current.lines.map(line => {
            line.x0 = line.x0 + 1
            line.x1 = line.x1 + 1
            return line
        })
        lineRef.current.lines = newLines
    }
    /*
    const stopFunction_drop = (point) => {
        if (target_y - point.y < CLOSE_D){
            return true
        }
        else return false
    }*/


    const stopFunction_target = (p) => {
        let target = p.target
        let d = Math.sqrt((p.x - target[0])**2 + (p.y - target[1])**2)
        if (d < 1){
           return true
        }else return false
    }

    const activateDropAnimation = () => {
        console.log('activating drop, height: ', windowHeight)
        const left_padding = width / 2 - about_width/2
        let i = 0
        pointRef.current.points.forEach(point => {
            if (point.orbitting){
                return point
            }
            let index = i % about.length
            let target = about[index]
            let x = target[0]*3 + left_padding
            let y =  target[1]*3 + windowHeight + about_top_padding

            if (i < about.length || true){
                point.updateTarget([x,y])
                point.updateStopFunction(stopFunction_target)
                point.activateTargetGravity()
            }else{
                point.updateTarget([point.x, windowHeight])
                point.updateStopFunction(stopFunction_target)
                point.activateTargetGravity()
                //point.updateVelocity([1,0])
            }
            i++
        
        })
    }

    const reActivateNameAnimation = () => {
        let i = 0
        pointRef.current.points.forEach(point => {
            if (point.orbitting){return point}
            let index = i % name.length
            let target = name[index]
            let x = target[0]*3 + name_left_padding
            let y = target[1]*3 + name_top_padding
            point.updateTarget([x,y])
            point.updateStopFunction(stopFunction_target)
            point.activateTargetGravity()
            i++
        })
    }
    const drawLines = (ctx) => {
        lineRef.current.lines.forEach(line => {
            ctx.strokeStyle = 'rgba(255,255,255, 0.2)'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(line.x0, line.y0)
            ctx.lineTo(line.x1, line.y1)
            ctx.stroke()
        })
    }


    const draw = (ctx) => {
        //console.log('drawing') 
        ctx.clearRect(0, y0, ctx.canvas.width, y1)
        drawLines(ctx)
        pointRef.current.points.forEach(point => {
            point.draw(ctx)
        })
        pointRef.current.orbitPoints.forEach(point => {
            point.connected.forEach(index => {
                point.drawConnection(ctx, pointRef.current.orbitPoints[index])
            })
        })

        
    }
    const update = () => {
        //return true
        let sceneUpdated = false
        pointRef.current.points.forEach(point => {
            let updated = point.update(width, height)
            if (updated){ sceneUpdated = true}
        })
        pointRef.current.orbitPoints.forEach(point => {
            let updated = point.update(width, height)
            if (updated){sceneUpdated = true}
        })

        updateLines()
        return sceneUpdated
    }

    return(
        <div className='Animation'id = 'animation-div'>
            <canvas id = {'template'} className = 'hiddenCanvas'/>
            {height !== 0 && width !== 0?
                <Canvas width = {width} height = {height} draw = {draw} update = {update} ready = {true}/>
                : <></>
            }
        </div>
    )
}

export default Animation