import React from 'react'

class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    render() {
        console.log("Rendering App")
        return (
            <h1>{this.state.title}</h1>
        )
    }

    componentDidMount() {
        fetch('http://localhost:8080', {
            headers: {'Content-Type': 'application/json' },
        })
        .then(res => { return res.json() })
        .then((titleObj) => {
            return this.setState ({
                title: titleObj.title
            })})
        .catch(err => console.log(`App.componentDidMount: get title ERROR: ${err}`));
    }

}


export default App;