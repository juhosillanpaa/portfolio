import React, { useState, useEffect } from 'react'
import 'normalize.css'
import './Styles/main.css'
import Landing from './Components/Landing/Landing'
import Description from './Components/Description/Description'
import Skills from './Components/Skills/Skills'
import Work from './Components/Work/Work'
import Footer from './Components/Footer/Footer'
import ReactPageScroller from 'react-page-scroller'
import {FullPage, Slide}  from 'react-full-page'
import About from './Components/About/About'
import Animation from './Components/Animation/Animation'
import SVGBackground from './Components/SVG/SVGBackground'
import Me from './Components/About/Me'
import Timeline from './Components/Timeline/Timeline'

const VERSION = 2

const largeScreenW = 1600
const mediumScreenW = 1000


const App = (props) => {
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
		setScrollProp(prop)
		setCurrentPage(prop.to)
	}

	const windowResize = () => {
		setResize(i => i + 1)
	}
	window.onresize = windowResize

	const getPaddings = () => {

		if (width > largeScreenW){
			return {
				name_top: 0.5, name_left: 0.05, title_top: 0.075, imageH: 800, imageW: 600, image_right: 0.1,
				descH: 175, skillBoxW: 300, skillBoxH: 250, description_top: 0.35, about_left: 0.2, about_top: 0.25
			}
		} else if (width > 1000) return {
			name_top: 0.5, name_left: 0.05, title_top: 0.025, imageH: 600, imageW: 450, image_right: 0.02,
			descH: 150, skillBoxW: 250, skillBoxH: 200, description_top: 0.35, about_left: 0.2, about_top: 0.25
		}
		else return {
			name_top: 0.5, name_left: 0.05, title_top: 0.075, imageH: 600, imageW: 450, image_right: 0.05,
			descH: 150, skillBoxW: 250, skillBoxH: 200,  description_top: 0.35, about_left: 0.4, about_top: 0.25
		}
	
	}


	return (
		<div className = 'Base' id = 'baseDIV'>
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
			

			<FullPage beforeChange = {beforeChange} duration = {1000}>
				<Slide>
					<Landing version = {VERSION}/>
				</Slide>
				{VERSION == 2 ?
					<Slide>
						<Me />
					</Slide>
					:<></>
				}

				<Slide>
					<About />
				</Slide>

				<Slide>
					{true ? 
						<Timeline windowWidth = {width} />
						:
						<Work windowWidth = {width} />
					}
				</Slide>

			</FullPage>

			
		
			
		</div>
	)
}
export default App