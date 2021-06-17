import React, { Component } from 'react';

import axios from 'axios';

import ReactDOM from 'react-dom';



class App extends Component{
    constructor(){
        super();
        this.state = {
            musicians: []
        };
    }
    async componentDidMount(){
       const musicians = (await axios.get('/api/musicians')).data
       this.setState({ musicians });
       console.log(musicians)
    }
    render(){
        const { musicians } = this.state;
        return (
        <ul>
          {
               musicians.map(musician => {
                return (
                <li>{musician.name}</li>
                )
            })
          }
        </ul>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));

