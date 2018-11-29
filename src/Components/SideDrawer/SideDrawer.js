import React, {Component} from 'react'
import './SideDrawer.css'
import { connect } from 'react-redux'
import {updateSideDrawerOpen} from '../../ducks/reducer'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {updateRoom} from '../../ducks/reducer'


class sideDrawer extends Component{
    constructor(props){
        super(props)

        this.state = {
            channels: [],
        }

        this.handleSetChannel = this.handleSetChannel.bind(this)
        this.handletest = this.handletest.bind(this)
    }


    componentDidMount(){
        axios.get('/api/getChannels')
        .then(res=>{
            console.log(res.data)

            this.setState({
                channels: res.data
            })
            // console.log(this.state.channels)
        })
    }

    handleSetChannel(i){
        // console.log(this.props)
        this.props.updateRoom(i)
        
    }

    handletest(){

        console.log(this.props)
    }

    renderChannels(){ 
        return this.state.channels.map((channel) =>{
            return(
                <div className = 'channel-image'>
                    <button onClick ={() => this.handleSetChannel(channel.channel_name)}>{channel.channel_name}</button>
                </div>
            )
        })
    }

    
    render(){
    return(
        <div className = 'side-drawer'>
            {this.renderChannels()}
            <Link to ='/Channel' className = 'create-channel'>+</Link>
            <button onClick={this.handletest}>test</button>
        </div>
    )
    }
}

function mapStateToProps(duckState) {
    return {
        sideDrawerOpen: duckState.sideDrawerOpen,
        room: duckState.room
    }
}

export default connect(mapStateToProps, { updateSideDrawerOpen, updateRoom})(sideDrawer);
