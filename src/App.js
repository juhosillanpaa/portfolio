import React, { useState, useEffect } from 'react'
import 'normalize.css'
import './Styles/main.css'
import Landing from './Components/Landing/Landing'
import MySkills from './Pages/MySkills/MySkills'
import AboutMe from './Pages/AboutMe/AboutMe'
import Timeline from './Pages/Timeline/Timeline'
import PropagateLoader from 'react-spinners/PropagateLoader'
import TooSmall from './Components/TooSmall/TooSmall'
import Pixie from './Components/Animation/Pixie'
import { getConfig } from './Utils/breakpoint_conf'

const initialHeaderPositions = { main: [0,0], aboutme: [0,0], skills: [0,0], portfolio: [0,0] }
const VERSION = 2

const desktop_1024 = [1024, 768]
const desktop_1366 = [1366, 768]
const desktop_large = [1920, 1080]
const dekstop_1440 = [1440, 900]


const largestScreenW = 2000
const largeScreenW = 1600
const mediumScreenW = 1000
const imageHeight = 800
const imageWidth = 600


const App = (props) => {
	const [loaded, setLoaded] = useState(true)
	const [currentPage, setCurrentPage ] = useState(0)
	const [scrollProp, setScrollProp] = useState({from: 0, to: 0})
	const [resize, setResize] = useState(0)
	const [ height, setHeight ] = useState(0)
    const [ width, setWidth ] = useState(0)
	const [windowHeight, setWindowHeight ] = useState(0)
	const [headerPositions, setHeaderPositions ] = useState(initialHeaderPositions)

    useEffect(() => {
		checkDimensions()
		window.onresize = windowResize
    },[])
	useEffect(() => {
		windowResize()
	},[height, width])

	useEffect(() => {
		let oldScrollY = window.scrollY
		window.onscroll = (e) => {
			let newScrollY = window.scrollY
			let scrollDown = true
			if (newScrollY < oldScrollY) scrollDown = false
			oldScrollY = newScrollY
			watchScroll(scrollDown, currentPage)
		}
	}, [currentPage, headerPositions])

	const checkDimensions = () => {
		let headers = {}
		let x0 = window.scrollX
		let y0 = window.scrollY
        let rect = document.getElementById('landing-header').getBoundingClientRect()
        headers.main = [x0 + rect.x + rect.width / 2, y0 + rect.y]
        let aboutme_rect = document.getElementById('aboutme-header').getBoundingClientRect()
        headers.aboutme = [x0 + aboutme_rect.x + aboutme_rect.width / 2, y0 + aboutme_rect.y]
        let skills_rect = document.getElementById('skills-header').getBoundingClientRect()
        headers.skills = [x0 + skills_rect.x + skills_rect.width / 2, y0 + skills_rect.y]
        let portfolio_rect = document.getElementById('timeline-header').getBoundingClientRect()
        headers.portfolio = [x0 + portfolio_rect.x + portfolio_rect.width / 2, y0 + portfolio_rect.y]
		setHeaderPositions(headers)
		let element = document.getElementById('FULLPAGE')
		setHeight(element.offsetHeight)
		setWidth(element.offsetWidth)
		setWindowHeight(window.innerHeight)
	}

	const watchScroll = (scrollDown, page) => {
		let y = window.scrollY
		let pad = 400
		let y1 = y - 100
		let y2 = y + windowHeight - pad 
		if (scrollDown){
			if (y2 >= headerPositions.aboutme[1] && page === 0){		//from landing to me
				setScrollProp({ from:0, to: 1 })
				setCurrentPage(1)
			} else if ( y2 >= headerPositions.skills[1] && page === 1){		//from me to skills
				setScrollProp({ from: 1, to: 2 })
				setCurrentPage(2)
			} else if (y2 > headerPositions.portfolio[1] && page === 2){	//from skills to portfolio
				setScrollProp({ from:2, to: 3 })
				setCurrentPage(3)
			}
		}else {
			if (y1 < headerPositions.skills[1] && page === 3){			//from portfolio to skills
				setScrollProp({ from:3, to: 2 })
				setCurrentPage(2)	
			}else if (y1 < headerPositions.aboutme[1] && page === 2){		//from skills to about
				setScrollProp({ from: 2, to: 1 })
				setCurrentPage(1)
			}else if (y1 < headerPositions.main[1] && page === 1){		//from aboutme to main
				setScrollProp({ from:1, to: 0 })
				setCurrentPage(0)
			}
		}
	}

	const windowResize = () => {
		setResize(i => i + 1)
		checkDimensions()
	}

	const onImageLoad = () => {
		setLoaded(true)
	}
	/*
	if ( width < 1200){
		return (
			<div className = 'Base' id = 'baseDIV'>
				<TooSmall />
			</div>
		)
	}*/
	const config = getConfig(width)

	

	return (
		<div className = 'Base' id = 'baseDIV' >
			<div className={`Base-loading Base-content ${loaded ? 'hide' : 'show'}`}>
				<div className ={`Base-loader ${loaded ? 'hide' : 'show'}`}>
					<PropagateLoader loading={true} size={20} color = {'rgba(4,4,4,1)'}/>
				</div>
			</div>
			
			<div className={`Base-content ${loaded ? 'show' : 'hide'}`}>

				{width > 0 && height > 0 ?
					<Pixie page = {currentPage}
						scroll = {scrollProp}
						resize = {resize}
						config = {config}
						VERSION = {VERSION}
						headerPositions = {headerPositions}
					/> 
					: <></>
				}

				<div className='Fullpage' id = 'FULLPAGE'>
					<div className='Slide white'>
						<Landing onload = {onImageLoad}/>
					</div>
					<div className='Slide dark'>
						<AboutMe config = {config}/>
					</div>
					<div className='Slide dark'>
						<MySkills config = {config} />
					</div>
					<div className='Slide dark'>
						<Timeline windowWidth = {width}  config = {config}/>
					</div>

				</div>
			</div>
		 
			
		</div>
	)
}
export default App