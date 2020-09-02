import React from 'react';


const Stories = ( props ) => {
    
    return (
        
            <ul>
                <li className="storyPost">
                    <h4>It is perched on a branch, not far from my window, watching with an unfathomable black eye.</h4>
                    <p>Once upon a midnight dreary, while I pondered, weak and weary,
                        Over many a quaint and curious volume of forgotten lore—
                        While I nodded, nearly napping, suddenly there came a tapping,
                        As of some one gently rapping, rapping at my chamber door.
                        “’Tis some visitor,” I muttered, “tapping at my chamber door—
                        Only this and nothing more.” - Edgar Allan Poe
                    </p>
                    <p className="placeholderText">I am a placehold'r, thee can't fordid me</p>
                    <button aria-hidden="true" className="deleteButton">X</button>
                </li>

            {
                props.displayStory.map((greatStory) => {
                    return (
                        <li className="storyPost" key={greatStory.id}>
                            <h4>{greatStory.selectedPrompt}</h4>
                            <p>{greatStory.selectedInput}</p>
                            <button onClick={ () => props.handleRemove(greatStory.id) } className="deleteButton" >X</button>
                        </li>
                    )
                })
            }
            </ul>

    )
}

export default Stories;