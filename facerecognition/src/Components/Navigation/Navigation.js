import React from 'react';




const Navigation = ({onRouteChange,isSignedIn}) => {
	if(isSignedIn)
	{
		return(
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
			<p onClick={() => onRouteChange('signin')} className='f3 dim black pa3 pointer'>sign out </p>
			</nav>
		)
		}else{
			return (
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
				<p onClick={() => onRouteChange('sign in')} className='f3 dim black pa3 pointer'>sign in</p>
				<p onClick={() => onRouteChange('Register')} className='f3 dim black pa3 pointer'>register </p>
			</nav>
	    )
	}

	
}

export default Navigation;