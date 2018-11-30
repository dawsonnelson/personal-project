import React, {Component} from 'react';
import './Channel.css'
import axios from 'axios'

export default class Channel extends Component {
    constructor(props){
        super(props);

        this.state = {
            channel: "",
        }

        this.handleChannelInput = this.handleChannelInput.bind(this);
        this.createChannel = this.createChannel.bind(this);
    }

    createChannel(){
        axios.post('/api/createChannel', {channel: this.state.channel})
        .then(this.props.history.push('/'))
    }

    handleChannelInput(e){
        this.setState({
            channel: e.target.value
        })
        console.log(this.state.channel)
    }

    render(){
        return(
                <div className = 'background'>
                    <div className = 'log-box'>
                        <img className = 'logo' src ={''} alt = ''></img>
                        <div>
                            <span className = 'title'>Create Channel</span>
                        </div>
                        <div className = 'something'>
                            <input className = 'channel-name-input' placeholder = 'Channel name' onChange={this.handleChannelInput}></input>
                        </div>
                        <div className = 'create-button-div'>
                            <button className = 'login-register' onClick ={this.createChannel}>Create Channel</button>
                        </div>
                    </div>
                </div>
        )
    }
}