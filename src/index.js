import React, { Component } from 'react';

import axios from 'axios';
import ReactDOM from 'react-dom';
// import { response } from 'express';



class App extends Component{
    constructor(){
        super();
        this.state = {
            musicians: [],
            selectedMusician: {}
        };
        this.display = this.display.bind(this);
    }


    async display(musicianId){
        const response = (await axios.get(`/api/musicians/${musicianId}`));
        const selectedMusician = response.data;
        this.setState({selectedMusician});
    }
  

    async componentDidMount(){
        try {
            const response = (await axios.get('/api/musicians'));
            const musicians = response.data;
            this.setState({ musicians });
            console.log(musicians)  
        
        }
        catch (error) {
          console.log(error)
        };
    }
 
  

    render(){
        // display(1);
        // console.log(display(1));
        const { musicians } = this.state;
        return (
          <div>
              <h1>TUNE WORLD</h1>
          <ul>
          {
               musicians.map(musician => {
                return (
                <li key = { musician.id }>
                    <a onClick = {()=> display(musician.id)}>
                    {musician.name}
                    </a>
                </li>
                )
            })
          }
        </ul>
        </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));

