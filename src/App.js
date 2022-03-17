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


const App = (props) => {
	const [currentPage, setCurrentPage ] = useState(0)
	const [playDropAnimation, setPlayDropAnimation ] = useState(false)		
	const [replayNameAnimation, setReplayNameAnimation ] = useState(false)		
	const [playAboutAnimation, setPlayAboutAnimation ] = useState(false)	

	const handlePageChange = (n) => setCurrentPage(n)
	const handleBeforePageChange = (n) => {
		return
		console.log('scrolling: ', n)
		if (currentPage === 0 && n === 1){		//transition from 0 to 1
			
			setReplayNameAnimation(false)
		}
		if (currentPage === 1 && n === 0){		// transition from 1 to 0
			setReplayNameAnimation(true)
			setPlayDropAnimation(false)
		}
	}
	const beforeChange = (prop) => {
		let {from, to} = prop
		if (from === 0 && to === 1){
			setPlayDropAnimation(true)
			setReplayNameAnimation(false)
		}
		if (from === 1 && to === 0){
			setPlayDropAnimation(false)
			setReplayNameAnimation(true)
		}
	}
	const afterChange = (prop) => {
		let {from, to} = prop
		if (from === 0 && to === 1){
			setPlayAboutAnimation(true)
			
		} 
	}

	const handleScrollUnavailable = (e) => {
		console.log('unavailable: ', e)
	}

	return (
		<div className = 'Base' id = 'baseDIV'>
			<SVGBackground />
			<Animation playDropAnimation = {playDropAnimation}
				replayNameAnimation = {replayNameAnimation}
				page = {currentPage}
			/>

			<FullPage beforeChange = {beforeChange} afterChange={afterChange} duration = {1000}>
				<Slide>
					<Landing />
				</Slide>

				<Slide>
					<About />
				</Slide>

				<Slide>
					<Work />
				</Slide>

			</FullPage>

		
			
		</div>
	)
}
export default App