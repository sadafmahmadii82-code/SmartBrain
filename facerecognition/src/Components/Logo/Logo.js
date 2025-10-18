import React from 'react';
import {Tilt} from 'react-tilt';
import './Logo.css';
import brain from './brain.png'



const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className='Tilt br2 shadow-2' option={{max:55}} style={{height:170,width:170}}>
			<div className='Tilt-inner pa3'>
				<img style={{}} alt='logo' src={brain} />
			</div>
			</Tilt>
		</div>
	)
}


export default Logo;