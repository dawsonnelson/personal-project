import React, {Component} from 'react';
import './DrawerToggleButton.css'
import {updateSideDrawerOpen} from '../../ducks/reducer'
import {connect} from 'react-redux'



class drawerToggleButton extends Component {
    constructor(props){
        super(props);

        this.state = {}
            
    }


    render(){
    return(
    <button className="toggle-button" onClick={this.props.updateSideDrawerOpen}>
        <div className="toggle-button_line" />
        <div className="toggle-button_line"  />
        <div className="toggle-button_line"  />
    </button>
    )
    }
}

function mapStateToProps(duckState) {
    return {
        sideDrawerOpen: duckState.sideDrawerOpen
    }
}
export default connect(mapStateToProps, { updateSideDrawerOpen})(drawerToggleButton);




