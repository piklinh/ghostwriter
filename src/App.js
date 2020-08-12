import React, { Component } from 'react';
import Stories from './Stories';

import prompts from './prompts';
import firebase from './firebase';

import image from './assets/ghost-01.png';
import './app.scss';

class App extends Component {
  constructor() {
    super();  
    this.state = {
      // Random number that selects a plot prompt from the list of prompts
      number: 0,

      // Holds array of input and current quote
      liveStory: [],

      // Empty string to hold story input from handleChange
      storyInput: '',

      // Emptry string to hold story id from handleRemove
      storyId: ''
    }
  }

  componentDidMount() {

    // Variable that holds the reference to our database
    const dbRef = firebase.database().ref();

    // Event listener that will fire every time there is a change in the database
    // It contains a callback function that will be used to get the data, and the data is known as 'response'
    dbRef.on('value', (snapshot) => {
      
      // Storing the response from our Firebase query into a variable called data
      const data = snapshot.val();

      // Empty variable to store new state
      const newState = [];

      for (let key in data) {

        // Create new Object to contain the response and key to be looped through
        const newObject = data[key];

        // Attach new property 'id' into the object = newObject
        newObject['id'] = key;

        // Push newObject into empty newState array
        newState.push(newObject);
      }

      // Set the state of liveStory to newState and update the DOM dynamically
      this.setState({
        liveStory: newState
      })
    });
  }

  // Function to generate random prompts from the prompt module
  generateRandomNumber = () => {
    this.setState({
      number: (Math.floor(Math.random() * 30))
    });
  }

  // Click handler to generate prompt when button is clicked
  handleGenerate = () => {
    this.generateRandomNumber();
  }

  handleChange = (event) => {
    this.setState({
      storyInput: event.target.value
    })
  }

  handleClick = (event) => {
    event.preventDefault();

    // Error handling, to prompt alert when white space is entered to the text area
    // Else push user Input and selected prompt to Firebase
    if (this.state.storyInput.trim() === "") {
      alert("You haven't shared your dark secrets with us!")

    } else {
      const dbRef = firebase.database().ref();

      // User input and selected story prompt are stored in a variable
      const storyPrompt = {
        selectedPrompt: prompts[this.state.number].plot,
        selectedInput: this.state.storyInput
      }

      dbRef.push(storyPrompt);

      this.setState({
        storyInput: ''
      })
    }
  }  
  
  // Handle function to delete posted stories, it passed to the child component in the display section
  handleRemove = (storyId) => {
    const dbRef = firebase.database().ref();

    dbRef.child(storyId).remove();

    this.setState({
        storyId: ''
    })
  }

  render() {
    return (
      <div className="app">

        {/* Header */}
        <header >
          <div className="wrapper">

            <div className="headerContainer">
              <div className="titleContainer">
                <h1>Ghostwriter</h1>
                <h2>Let your inner spirit guide you</h2>
              </div>
              
              <div className="imageContainer">
                  <img src={image} alt="Cute ghost with a pencil"/>
              </div>
            </div>
          </div>
        </header>
        {/* End of Header  */}

        {/* Main Section */}
        <main className="wrapper">

            {/* Prompt Section */}

            <div className="promptEntry">
              <div className="generatePrompt">
                <h3 className="prompt">{prompts[this.state.number].plot}</h3>
                <h3 className="author">{prompts[this.state.number].author}</h3>
              </div>
              <button className="promptButton" onClick={this.handleGenerate}>Generate a prompt</button>
            </div>

            {/* Story Input Section */}
            <div className="storyInput">
              <p>Share your dark tale with us</p>
              <form action="submit">
                <label aria-label="Share your dark tale with us" htmlFor="newStory"></label>
                <textarea
                  name="newStory" 
                  id="newStory"
                  cols="70"
                  rows="10"
                  maxLength="500"
                  placeholder="It was a dark and stormy night..."
                  onChange={this.handleChange} 
                  value={this.state.storyInput}
                />
                <button className="submitButton" onClick={this.handleClick}>Submit</button>
              </form>

              <p className="characterLength">{500 - this.state.storyInput.length} characters left</p>
            </div>
            
            {/* Display Section */}
            <div className="displayStory">

                <Stories 
                  displayStory = { this.state.liveStory }
                  handleRemove = { this.handleRemove }
                />

            </div>

        </main>
        {/* End of Main Section */}
        
        <footer className="wrapper">
          <p>Developed by Pik Lin | Image from <a href="https://www.freepik.com/">Freepik</a></p>
        </footer>
      </div>
      // End of App Section
    );
  }
}

export default App;
