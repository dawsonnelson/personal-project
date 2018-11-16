import React, {Component} from 'react';
import './NavTop.css';
import menuIcon from '../../assests/menu icon.png'
import IconButton from '@material-ui/core/IconButton';

export default class NavTop extends Component{
    

    render() {
        return(
                <div className = 'nav-top-background'>
                    <div className = 'menu-icon'>
                        <IconButton className='menu-icon-button'></IconButton>
                    </div>
                    <div className='channel-name'>
                        <span className='c'>Channel Name</span>
                    </div>
                </div>
        )
    }
}


//<img id='menu-icon-image' src={menuIcon} alt=''/>