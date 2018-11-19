import React, {Component} from 'react'
import './SideDrawer.css'
import { connect } from 'react-redux'
import {updateSideDrawerOpen} from '../../ducks/reducer'

class sideDrawer extends Component{
    constructor(){
        super()

        this.state = {

        }
    }

    
    render(){
    // console.log(this.props.sideDrawerOpen)
    // let drawerClasses = 'side-drawer';
    // if(this.props.sideDrawerOpen) {
    //     drawerClasses = 'side-drawer open';
    // }
    return(
        <nav className = 'side-drawer'>
        <ul>
            <li><span>hello world</span></li>
            <li><span>hello thing</span></li>
        </ul>
    </nav>
    )
}
}

function mapStateToProps(duckState) {
    return {
        sideDrawerOpen: duckState.sideDrawerOpen,
    }
}

export default connect(mapStateToProps, { updateSideDrawerOpen})(sideDrawer);
