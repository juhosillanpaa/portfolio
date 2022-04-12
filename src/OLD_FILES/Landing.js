import React, {useState, useEffect, useRef} from 'react'
import './Landing.css'
import { Title } from '../Text'
import Canvas from '../Canvas/Canvas'
import RandomPoints from '../Canvas/RandomPoints'
import NameAnimation from '../Canvas/NameAnimation'
import DropAnimation from '../Canvas/DropAnimation'
import Point from '../Canvas/Point'
const name_j = require('../../Utils/Letters/name.txt')


const N_POINTS = 750

const createPoints = () => {
    let points = []
    for (let i = 0; i < N_POINTS; i++){
            let p = new Point(i, 100,100, 0, [0,0], 2, 'white', )
            points.push(p)
    }
    return points
}





const Landing = (props) => {
    const pointRef = useRef({ points: createPoints(), ready: false })
    const [ playDrop, setPlayDrop ] = useState(false)
    const [ height, setHeight ] = useState(0)
    const [ width, setWidth ] = useState(0)
    const dx = 200
    const dy = 500

    useEffect(() => {
        let element = document.getElementById('Landing-div')
        setHeight(element.clientHeight)
        setWidth(element.clientWidth)
    },[])

    const activateTransition = () => {
        setPlayDrop(true)
    }

    return(
        <div className='Landing'
            id = 'Landing-div'

        >
            {   height != 0 && width != 0 ?
                <>{
                    playDrop ? 
                    <DropAnimation width = {width} height = {height} dx = {dx} dy = {dy} pointRef = {pointRef}/>
                    :
                    <div onClick = {() => activateTransition()}>
                        <NameAnimation width={width} height={height} dx = {dx} dy = {dy} pointRef = {pointRef}/>
                    </div>
                }</>
                : <></>
            }       
        </div>

        
    )
}

export default Landing