import React, {useState, useEffect, useRef} from 'react'
import Canvas from '../Canvas/Canvas'
import Point from '../../Classes/Point/Point'
import hero_image from './yellow_small.png'
import './Animation.css'


const imageSize = 600
const image_right_padding = 300
const image_bot_padding = 200



const get_hero_pixels = (pointRef) => {
    const image = new Image()
    image.onload = () => {
        let canvas = document.getElementById('hero')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        let mapped = []
        for (let y = 0; y < image.width; y++){
            let row = []
            for (let x = 0; x < image.height; x++){
                let pixel = ctx.getImageData(x,y,1,1)
                let brightness = calculateRelativeBrightness(pixel.data[0], pixel.data[1], pixel.data[2])
                row.push([ pixel.data[0], pixel.data[1], pixel.data[2], brightness])
            }
            mapped.push(row)
        }
        console.log('mapped = ', mapped)
        pointRef.current.pixels = mapped
    }
    image.src = hero_image
    
}

const createRainPoints = () => {
    let x0 =0
    let y0 = 0
    let points = []
    for (let i = 0; i < 2000; i++){
        let dx = Math.random()*imageSize
        let dy = Math.random() * imageSize
        let point = new Point(
            i, dx+x0, y0 + dy, 1, [0,1], 2, 'white'
        )
        point.setYMax(y0 + imageSize)
        point.setTrailLength(10)
        points.push(point)
    }
    return points
}

const calculateRelativeBrightness = (r,g,b) => {
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}



const HeroAnimation = ({}) => {
    const pointRef = useRef({ points: [], pixels: [], heroPos: [0,0] })

    useEffect(() => {
        get_hero_pixels(pointRef)
    },[])

    useEffect(() => {
        pointRef.current.points = createRainPoints()
        pointRef.current.heroPos = [0,0]
    },[])




    const draw = (ctx) => {
        ctx.globalAlpha = 0.05
        ctx.fillStyle = 'rgb(0,0,0)'
        ctx.globalAlpha = !
        ctx.fillRect(0,0,imageSize, imageSize)
        pointRef.current.points.forEach(point => {
            //point.draw2(ctx)
            point.draw(ctx)
        })

    }

    const update = () => {
        let hero_pos = pointRef.current.heroPos
        let y_max = hero_pos[1] + imageSize
        if (pointRef.current.pixels.length > 0){
            pointRef.current.points.forEach(point => {
                if (point.y > y_max){
                    point.setPosition(hero_pos[0] + Math.random() * imageSize, hero_pos[1])
                }
                let x_index = Math.min(Math.floor(point.x - hero_pos[0]), imageSize - 1)
                let y_index = Math.min(Math.floor(point.y - hero_pos[1]), imageSize - 1)
                let pixel =pointRef.current.pixels[y_index][x_index]
                let brightness = pixel[3]
                let velocity = (1 - brightness) * 2
                point.setColor(`rgba(${pixel[0]},${pixel[1]},${pixel[2]},1)`)
                //point.addToTrail([point.x, point.y, pixel[0], pixel[1], pixel[2]])
                point.setPosition(point.x, point.y + 1)
            })
        }
        return true
    }

    return(
        <div className='Hero-animation' id = 'hero-div'>
            <canvas id = {'hero'} className = 'hero-pre-canvas'/>
            <Canvas width = {600} height = {600} draw = {draw} update = {update} ready = {true}/>
        </div>
    )
}

export default HeroAnimation