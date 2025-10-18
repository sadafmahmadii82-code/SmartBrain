import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js';
import Signin from './Components/Signin/Signin.js';
import Register from './Components/Register/Register.js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import ParticlesBackground from './ParticlesBackground';


class App extends React.Component{
  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl:null,
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined: ''
      }
    }
  }

  loadUser = (data) =>{
    this.setState({user: {
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
    }})
  }

componentDidMount() {
  fetch('http://localhost:3000/')
  .then(response => response.json())
  .then(data => console.log(data))
}

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input});
        fetch('http://localhost:3000/image', {
          method:'put',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
            id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user , {entries : count}))
     })
  }

  onRouteChange = (route) => {
    if(route === 'signin') {
      this.setState({isSignedIn:false})
    }else if(route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }

  render() {
    const{isSignedIn , imageUrl , route} = this.state;
    return(
         <div className="App">
            <ParticlesBackground/>
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
              {route === 'home'
              ? <div> 
                 <Logo/>
                 <Rank name={this.state.user.name} entries={this.state.user.entries} />
                 <ImageLinkForm 
                   onInputChange={this.onInputChange} 
                   onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition imageUrl={imageUrl}/>
               </div>
              : (
              route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )
          }
         </div>

     )
   }  
}

export default App;
