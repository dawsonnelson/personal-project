import React, {Component} from 'react';
import './InputBar.css'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { updateInputBar } from '../../../../ducks/reducer'
import { connect } from 'react-redux'
import socket from "socket.io-client"

const io = socket.connect("http://localhost:4000")


class InputBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            // textInput: null,
            // message: this.props.inputBar
            message: "",
            messages: [],
    
        }

        this.handleTextInput = this.handleTextInput.bind(this)
        this.handleCreateMessage = this.handleCreateMessage.bind(this)
        
    }

    handleTextInput(e){
        this.props.updateInputBar(e.target.value)
    }

    handleCreateMessage(){
        io.emit("send-message", {
            message: this.props.inputBar
        })
        console.log(this.props.inputBar)
        let {inputBar} = this.props

        axios.post('/api/createMessage', {inputBar})
        .then(res=>{
            console.log(res)
        })
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
    }
}

export default connect(mapStateToProps, { updateInputBar})(InputBar);

//<img className = 'picture-input-button-image' src ={add_button} alt=''/>