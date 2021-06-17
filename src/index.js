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
          <div>
              <h1>TUNE WORLD</h1>
          <ul>
          {
               musicians.map(musician => {
                return (
                <li key = { musician.id }>
                    <a href = {`#${musician.id}`}>
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

// ReactDOM.render(<App />, document.querySelector('#root'));

