import React, {Component} from 'react';
import './NavTop.css';
import menuIcon from '../../assests/menu icon.png'

export default class NavTop extends Component{


    render() {
        return(
                <div className = 'nav-top-background'>
                    <div className = 'menu-icon'>
                        <button className='menu-icon-button'><img id='menu-icon-image' src={menuIcon} alt=''/></button>
                    </div>
                    <div className='channel-name'>
                        <span className='c'>Channel Name</span>
                    </div>
                </div>
        )
    }
}