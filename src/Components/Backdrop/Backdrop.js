import React, { Component } from 'react';
import './Backdrop.css'
import {updateSideDrawerOpen} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Backdrop extends Component{
    constructor(props){
        super(props);

        this.state ={}
    }
    render(){

    
    return(
        <div className = 'backdrop' onClick={this.props.updateSideDrawerOpen}>
        </div>
    )
}
}


function mapStateToProps(duckState) {
    return {
        sideDrawerOpen: duckState.sideDrawerOpen
    }
}
export default connect(mapStateToProps, { updateSideDrawerOpen})(Backdrop);