import React, {Component} from 'react'
import './SideDrawer.css'
import { connect } from 'react-redux'
import {updateSideDrawerOpen} from '../../ducks/reducer'
import {Link} from 'react-router-dom';


class sideDrawer extends Component{
    constructor(){
        super()

        this.state = {

        }

        this.handleCreateChannel = this.handleCreateChannel.bind(this);
    }

    handleCreateChannel(){

    }

    
    render(){
    return(
        <div className = 'side-drawer'>
            <Link to ='/Channel' className = 'create-channel'>+</Link>
        </div>
    )
}
}

function mapStateToProps(duckState) {
    return {
        sideDrawerOpen: duckState.sideDrawerOpen,
    }
}

export default connect(mapStateToProps, { updateSideDrawerOpen})(sideDrawer);
