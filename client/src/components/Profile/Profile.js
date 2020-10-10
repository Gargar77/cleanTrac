import React from 'react';
import {ReactComponent as BackgroundSVG} from '../../assets/profile_background.svg';
import './Profile.css';

// This component will hold the unique profile picture uploaded by the client
// http://lorempixel.com/400/200/ is a placeholder image until feature is executed

const profile = props => {
    let background = null;
    if (props.header) {
        background = (
            <BackgroundSVG className="profile-background" />
        );
    }

    return(
        <div 
            className="profile-image-container"
            >
             <img 
                className="profile-image" 
                src="https://randomuser.me/api/portraits/men/4.jpg"
                />
                {background}
        </div>
    );
}

export default profile;