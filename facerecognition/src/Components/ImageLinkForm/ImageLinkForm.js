import React from 'react';
import './ImageLinkForm.css';




const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
	return (
		<div>
			<p>{'this magic brain will detect faces in your pics! give it a try '}</p>
			<div className='center'>
				<div className='form center pa4 br2 shadow-5'>
				<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
				<button className='f4 w-30 grow link ph3 pv2 dib bg-light-blue'
					onClick={onButtonSubmit}
				> DETECT </button>
				</div>
			</div>
		</div>
		
	)
}

export default ImageLinkForm;