import React, {Component} from 'react';
import './NavTop.css';
import DrawerToggleButton from '../../SideDrawer/DrawerToggleButton';
import {updateRoom} from '../../../ducks/reducer'
import { connect } from 'react-redux'

class NavTop extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }
    
    render(){
    return(
        <div className = 'nav-top-background'>
            <div className = 'menu-icon'>
                {/* <IconButton className='menu-icon-button'></IconButton> */}
                <DrawerToggleButton />
            </div>
            <div className='channel-name'>
                <span className='c'>{this.props.room}</span>
            </div>
        </div>
    )
    }
}

function mapStateToProps(duckState) {
    return {
        room: duckState.room
    }
}

export default connect(mapStateToProps, {updateRoom})(NavTop);




//<img id='menu-icon-image' src={menuIcon} alt=''/>