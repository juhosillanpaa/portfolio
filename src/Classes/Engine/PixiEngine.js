import * as PIXI from 'pixi.js'
import { animate } from './animations'
//import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';

const SLOW = 1
const FAST = 2

PIXI.settings.ROUND_PIXELS = true
const WHITE_HEX = 0xffffff

class PixiEngine {
    constructor(content){
        this.ready = false
        this.points = []
        this.content = content
        
        this.app = new PIXI.Application({
            antialias: false,
            backgroundAlpha: 0,
            resizeTo: this.content,
        })
        
        this.content.appendChild(this.app.view)
        this.lastTime = 0
        this.headerArrays = {}
        this.headerPositions = {}
        this.mode = SLOW

        /*this.graphics = new PIXI.Graphics()
        this.app.stage.addChild(this.graphics)*/
    }
    setToFast(){
        this.mode = FAST
    }
    setToSlow(){
        this.mode = SLOW
    }

    setReady(){
        this.ready = true
    }
    
    setHeaderArrays(arrays){
        this.headerArrays = arrays
    }

    setHeaderPositions(positions){
        this.headerPositions = positions
    }

    resize(){
        this.app.resize()
    }

    setPoints(points){
        this.points = points
    }
    shift(){
        this.points.forEach(point => {
            point.shift(50)
        })
    }

    update(){
        let delta = this.app.ticker.elapsedMS / 1000
        this.points.forEach(point => {
            point.update(delta, this.mode)
        })
    }
    /*
    drawRects(){
        this.graphics.clear()
        this.points.forEach(point => {
            this.graphics.beginFill(WHITE_HEX)
            let [ x, y ] = point.pos
            this.graphics.drawRect(x,y,point.size,point.size)
            this.graphics.endFill()
        })

    }*/

    render(){
        this.app.ticker.remove(this.update, this)
        this.app.stage.removeChildren()
        this.points.forEach(point => {
            this.app.stage.addChild(point.sprite)
        })
        this.app.ticker.add(this.update, this)
        this.startTime = performance.now()
    }

    animateHeader(headerA, headerP, size, factor, initializing = false){
        animate(
            this.points,
            this.headerArrays[headerA],
            this.headerPositions[headerP],
            size,
            factor,
            initializing
        )
    }

}


export default PixiEngine