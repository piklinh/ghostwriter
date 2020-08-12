import React from 'react';

const Stories = ( props ) => {
    
    return (
        <div>
            {
                props.displayStory.map((greatStory, index) => {
                    return (
                        <li key={index}>
                            <h4>{greatStory.selectedPrompt}</h4>
                            <p>{greatStory.selectedInput}</p>
                        </li>
                    )
                })
            }
        </div>
    )
}


export default Stories;