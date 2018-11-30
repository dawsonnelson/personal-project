import React, {Component} from 'react';
import './InputBar.css'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { updateInputBar } from '../../../../ducks/reducer';
import { updateRoom } from '../../../../ducks/reducer';
import { connect } from 'react-redux'
import {updateUserName} from '../../../../ducks/reducer'
import {updatePassWord} from '../../../../ducks/reducer'
import {resetInput} from '../../../../ducks/reducer'
import io from "socket.io-client"


const socket = io.connect(process.env.REACT_APP_SOCKETSURL)


class InputBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            // textInput: null,
            // message: this.props.inputBar
            // message: "",
            // messages: [],
    
        }

        this.handleTextInput = this.handleTextInput.bind(this)
        this.handleCreateMessage = this.handleCreateMessage.bind(this)
        this.handleReset = this.handleReset.bind(this)
        
    }

    handleTextInput(e){
        this.props.updateInputBar(e.target.value)
    }

    handleCreateMessage(){
        // console.log(this.props.room)
        if(this.props.room === ""){
            socket.emit("send-message", {
                message: this.props.inputBar
            })
            console.log("empty")
            let {inputBar} = this.props
    
            axios.post('/api/createMessage', {inputBar})
            this.handleReset();
                // console.log(res)
        } else {
            console.log(this.props)
            // console.log('emit hit')
            socket.emit("send-room-message", {
                name: this.props.username,
                room: this.props.room,
                message: this.props.inputBar,
            })
            
            let {inputBar, room, username} = this.props
            console.log(this.props)
    
            axios.post('/api/createMessage', {inputBar, room, username})
            this.handleReset()
            
        }
        
    }

    handleReset(){
        this.props.resetInput()
    }


    ///////// keep /////////
    // handleCreateMessage(){
    //     console.log(this.props)
    //     let {inputBar} = this.props

    //     axios.post('/api/createMessage', {inputBar})
    //     .then(res=>{
    //         console.log(res)
    //     })
    // }

    
    render() {
        // console.log(this.state.messages)
        return(
                <div className = 'InputBar-Background'>
                    <div className = 'inputs'>
                        <IconButton className = 'picture-input-button' variant="contained"><Icon/></IconButton>
                        <input className = 'text-input' onChange = {this.handleTextInput} value={this.props.textInput}></input>
                        <IconButton className = 'enter-button' variant="contained" onClick={this.handleCreateMessage}><Icon/></IconButton>  
                    </div> 
                </div>
        )
    }
}

function mapStateToProps(duckState) {
    return {
        inputBar: duckState.inputBar,
        room: duckState.room,
        username: duckState.userName,
        password: duckState.passWord
    }
}

export default connect(mapStateToProps, { updateInputBar, updateRoom, updateUserName, updatePassWord, resetInput})(InputBar);

//<img className = 'picture-input-button-image' src ={add_button} alt=''/>