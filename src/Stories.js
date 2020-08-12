import React from 'react';

const Stories = ( props ) => {
    
    return (
        <div>
            <ul>
            {
                props.displayStory.map((greatStory, index) => {
                    return (
                        <li className="storyPost" key={index}>
                            <h4>{greatStory.selectedPrompt}</h4>
                            <p>{greatStory.selectedInput}</p>
                            <button className="deleteButton">X</button>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}


export default Stories;