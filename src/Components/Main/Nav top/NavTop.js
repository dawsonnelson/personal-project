import React from 'react';
import './NavTop.css';
// import menuIcon from '../../assests/menu icon.png';
// import IconButton from '@material-ui/core/IconButton';
// import Button from '../../SideDrawer/DrawerToggleButton'
import DrawerToggleButton from '../../SideDrawer/DrawerToggleButton';

export default function NavTop(props){
    return(
        <div className = 'nav-top-background'>
            <div className = 'menu-icon'>
                {/* <IconButton className='menu-icon-button'></IconButton> */}
                <DrawerToggleButton />
            </div>
            <div className='channel-name'>
                <span className='c'>Channel Name</span>
            </div>
        </div>
    )
}




//<img id='menu-icon-image' src={menuIcon} alt=''/>