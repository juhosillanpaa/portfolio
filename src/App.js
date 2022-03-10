import React, { useState, useEffect } from 'react'
import 'normalize.css'
import './Styles/main.css'
import Landing from './Components/Landing/Landing'
import Description from './Components/Description/Description'
import Skills from './Components/Skills/Skills'
import Work from './Components/Work/Work'
import Footer from './Components/Footer/Footer'

const App = (props) => {

	

  	return (
		<div className = 'Base' >
			<Landing />
			<Description />
			<Skills />
			<Work />
			<Footer />
		</div>
	)
}
export default App