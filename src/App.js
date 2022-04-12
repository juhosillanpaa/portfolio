import React, { useState, useEffect } from 'react'
import 'normalize.css'
import './Styles/main.css'
import Landing from './Components/Landing/Landing'
import {FullPage, Slide}  from 'react-full-page'
import About from './Components/About/About'
import Animation from './Components/Animation/Animation'
import SVGBackground from './Components/SVG/SVGBackground'
import Me from './Components/About/Me'
import Timeline from './Components/Timeline/Timeline'
import PropagateLoader from 'react-spinners/PropagateLoader'
import TooSmall from './Components/TooSmall/TooSmall'


const VERSION = 2

const largestScreenW = 2000
const largeScreenW = 1600
const mediumScreenW = 1000
const imageHeight = 800
const imageWidth = 600



const App = (props) => {
	const [loaded, setLoaded] = useState(false)
	const [currentPage, setCurrentPage ] = useState(0)
	const [scrollProp, setScrollProp] = useState({from: 0, to: 0})
	const [resize, setResize] = useState(0)
	const [ height, setHeight ] = useState(0)
    const [ width, setWidth ] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)

	useEffect(() => {
        let element = document.getElementById('baseDIV')
        let wh = window.innerHeight
        let h = element.clientHeight
        let w = element.clientWidth
        setWindowHeight(wh)
        setHeight(h)
        setWidth(w)
    },[resize])

	const beforeChange = (prop) => {
		console.log('beforechange')
		if (!loaded){}
		setScrollProp(prop)
		setCurrentPage(prop.to)
	}

	const windowResize = () => {
		setResize(i => i + 1)
	}
	window.onresize = windowResize

	const getPaddings = () => {
		if (width >= largestScreenW){
			return {
				name_top: 0.5,  title_top: 0.075, imageH: imageHeight, imageW: imageWidth, image_right: 0.1,
				descH: 175, skillBoxW: 300, skillBoxH: 250, skillBoxOffset:100, skillBoxMargin: 20,
				description_top: 0.35,  about_top: 0.15, about_x: 0.3,about_line_y: 0.25,
				heroframe_line: 100, factor: 4, title_line_y: 0.175,
				timelineH: 400, timelineW: 1400
			}
		}
		else if (width >= largeScreenW){
			return {
				name_top: 0.5, title_top: 0.075, imageH: imageHeight*0.8, imageW: imageWidth * 0.8, image_right: 0.1,
				descH: 175, skillBoxW: 300, skillBoxH: 250, skillBoxOffset:100, skillBoxMargin: 20,
				description_top: 0.35, about_top: 0.15, about_x: 0.3, about_line_y: 0.25,
				heroframe_line: 75, pixelFont: 30, factor: 4, title_line_y: 0.175,
				timelineH: 400, timelineW: 1400
			}
		} else if (width >= mediumScreenW) return {
			name_top: 0.45, title_top: 0.025, imageH: imageHeight * 0.6, imageW: imageWidth * 0.6, image_right: 0.05,
			descH: 150, skillBoxW: 250, skillBoxH: 200, skillBoxOffset:50, skillBoxMargin: 5,
			description_top: 0.35,  about_top: 0.1, about_x: 0.3, about_line_y: 0.22,
			heroframe_line: 50, factor: 3.5, title_line_y: 0.15,
			timelineH: 250, timelineW: 1000
		}
		else return {
			name_top: 0.5, title_top: 0.075, imageH: 600, imageW: 450, image_right: 0.05,
			descH: 150, skillBoxW: 250, skillBoxH: 200,  skillBoxOffset:0,
			description_top: 0.35, about_top: 0.15, about_x: 0.3,about_line_y: 0.3,
			heroframe_line:50, factor: 4, title_line_y: 0.15,
			timelineH: 400, timelineW: 1400
		}
	
	}
	const onImageLoad = () => {
		console.log('image is loaded')
		setLoaded(true)
	}
	if ( width < 1200){
		return (
			<div className = 'Base' id = 'baseDIV'>
				<TooSmall />
			</div>
		)
	}


	return (
		<div className = 'Base' id = 'baseDIV'>
			<div className={`Base-loading Base-content ${loaded ? 'hide' : 'show'}`}>
				<div className = 'Base-loader'>
					<PropagateLoader loading={true} size={20} color = {'rgba(4,4,4,1)'}/>
				</div>
			</div>
			
	
			<div className={`Base-content ${loaded ? 'show' : 'hide'}`} >
				<SVGBackground
					resize = {resize}
					windowHeight = {windowHeight}
					fullHeight = {height}
					windowWidth = {width}
					paddings = {getPaddings()}
					version = {VERSION}
				/>
				<Animation
					page = {currentPage}
					scroll = {scrollProp}
					resize = {resize}
					windowWidth = {width}
					windowHeight = {windowHeight}
					fullHeight = {height}
					paddings = {getPaddings()}
					VERSION = {VERSION}
				/>
				

				<FullPage beforeChange = {beforeChange} duration = {1000} >
					<Slide>
						<Landing onload = {onImageLoad}/>
					</Slide>
					{VERSION == 2 ?
						<Slide>
							<Me config = {getPaddings()}/>
						</Slide>
						:<></>
					}

					<Slide>
						<About windowWidth = {width} />
					</Slide>

					<Slide>
						<Timeline windowWidth = {width}  config = {getPaddings()}/>
					</Slide>

				</FullPage>
			</div>

			
			

		
		
			
		</div>
	)
}
export default App