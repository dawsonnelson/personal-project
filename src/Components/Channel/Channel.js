import React, {Component} from 'react';
import './Channel.css'
import { connect } from 'react-redux'
import {updateUserId} from '../../ducks/reducer'
import {updateSideDrawerOpen} from '../../ducks/reducer'
import {updateRoom} from '../../ducks/reducer'
import axios from 'axios'

 class Channel extends Component {
    constructor(props){
        super(props);

        this.state = {
            channel: "",
        }

        this.handleChannelInput = this.handleChannelInput.bind(this);
        this.createChannel = this.createChannel.bind(this);
    }

    createChannel(){
        axios.post('/api/createChannel', {channel: this.state.channel, userId: this.props.userId})
        .then((res)=>{
            this.props.updateSideDrawerOpen()
            this.props.updateRoom(this.state.updateRoom)
            this.props.history.push('/')
        })
    }

    handleChannelInput(e){
        this.setState({
            channel: e.target.value
        })
        // console.log(this.props)
    }

    render(){
        return(
            <div id = 'app'>
                <div className = 'background'>
                    <div className = 'channel-log-box'>
                        <img className = 'logo' src ={''} alt = ''></img>
                        <div>
                            <span className = 'channel-title'>Create Channel</span>
                        </div>
                        <div className = 'channel-something'>
                            <input className = 'channel-name-input' placeholder = 'Channel name' onChange={this.handleChannelInput}></input>
                        </div>
                        <div className = 'create-button-div'>
                            <button className = 'channel-login-register' onClick ={this.createChannel}>Create Channel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(duckState) {
    return {
        userId: duckState.userId,
        sideDrawerOpen: duckState.sideDrawerOpen,
        room: duckState.room
    }
}

export default connect(mapStateToProps, {updateUserId, updateSideDrawerOpen, updateRoom })(Channel);