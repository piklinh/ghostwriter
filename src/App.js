import React, { Component } from 'react';
import Stories from './Stories';

import prompts from './prompts';
import firebase from './firebase';

import image from './ghost-01.png';
import './App.css';

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
        newState.push(data[key]);
      }

      this.setState({
        liveStory: newState
      })
    });
  }

  generateRandomNumber = () => {
    this.setState({
      number: (Math.floor(Math.random() * 30))
    });
  }

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
    if (this.state.storyInput.trim() === "") {
      alert("You haven't shared your dark secrets with us!")

    } else {
      const dbRef = firebase.database().ref();

      // User input and selected story prompt are stored in a variable
      const storyPrompt = {
        selectedPrompt: prompts[this.state.number].plot,
        selectedInput: this.state.storyInput
      }

      // The variable is pushed into the Firebase database
      dbRef.push(storyPrompt);

      this.setState({
        storyInput: ''
      })
    }
  }  
  
  render() {
    return (
      <div className="App">

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

        {/* Main Section */}
        <main className="wrapper">

            {/* Prompt Section */}

            <div className="promptEntry">
              <div className="generatePrompt">
                <h3 className="prompt">{prompts[this.state.number].plot}</h3>
                <h3 className="author">{prompts[this.state.number].author}</h3>
              </div>
              <button nameClass="promptButton" onClick={this.handleGenerate}>Generate a prompt</button>
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
                <button nameClass="submitButton" onClick={this.handleClick}>Submit</button>
              </form>

              <p className="characterLength">{500 - this.state.storyInput.length} characters left</p>
            </div>
      
            {/* Display Section */}
            <div className="displayStory">
              <ul>
                <li className="storyPost">
                  <h4>It is perched on a branch, not far from my window, watching with an unfathomable black eye.</h4>
                  <p>Once upon a midnight dreary, while I pondered, weak and weary,
                      Over many a quaint and curious volume of forgotten lore—
                      While I nodded, nearly napping, suddenly there came a tapping,
                      As of some one gently rapping, rapping at my chamber door.
                      “’Tis some visitor,” I muttered, “tapping at my chamber door—
                      Only this and nothing more.” - Edgar Allan Poe"</p>
                  <button className="deleteButton">X</button>
                </li>

                <Stories 
                  displayStory = { this.state.liveStory }
                />
              </ul>
            </div>

        </main>
        {/* End of Main Section */}
        
        <footer className="wrapper">
          <p>Developed by Pik Lin | Image from Freepik</p>
        </footer>
      </div>
      // End of App Section
    );
  }
}

export default App;
