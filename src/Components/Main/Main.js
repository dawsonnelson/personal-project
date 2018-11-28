import React, {Component} from 'react'
import './Main.css'
import './Nav top/NavTop'
import './Body/Input Bar/InputBar'
import NavTop from './Nav top/NavTop';
import InputBar from './Body/Input Bar/InputBar'
import SideDrawer from '../SideDrawer/SideDrawer'
import BackDrop from '../Backdrop/Backdrop'
import { connect } from 'react-redux'
import {updateSideDrawerOpen} from '../../ducks/reducer'
import {updateInputBar} from '../../ducks/reducer'
import {updateRoom} from '../../ducks/reducer'
// import axios from 'axios';

import io from "socket.io-client";




// const drawerWidth = 240;
const socket = io.connect("http://localhost:4000");

class Main extends Component {
    constructor(props){
        super(props)

        this.state = {
            message:"",
            messages: [],
            currentRoom: 1,
            someoneTyping: false,

            joined: false,
            roomJoined: false,
            name: "",
            roomMessage: "",
            roomMessages: [],
            username: '',
            password: '',
            allMessages: []
        };

        this.handletest = this.handletest.bind(this)
        this.handleRoomChange = this.handleRoomChange.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
        this.sendRoomMessage = this.sendRoomMessage.bind(this)
        ///////////////// global ///////////////////////
        socket.on("all-users", data => {
            let tempMessages = [...this.state.messages];
            tempMessages.push(`${data} has joined the chat`);
            console.log(this.state.messages)
            return {messages: tempMessages}
        });
        
        socket.on("message-recived", data => {
            this.setState(() => {

                if(this.props.room === ""){
                    console.log('mess')
                    let tempMessages = [...this.state.messages];
                    tempMessages.push(`${data.message}`);
                    return { messages: tempMessages };
                } else {
                    console.log('room')
                    let tempMessages = [...this.state.roomMessages];
                    tempMessages.push(data.message);
                    return { roomMessages: tempMessages };
                }
                
            })
        })
        /////////////////// Room ///////////////////////
        socket.on("room-message-recived", data => {
            let tempMessages = [...this.state.roomMessage];
            tempMessages.push(data.message);
            console.log(this.state.roomMessage)
            this.setState({ roomMessages: tempMessages });
        });

        socket.on("send-room-message-received", data => {
            this.setState(() => {
                let tempMessages = [...this.state.roomMessages];
                tempMessages.push(data.message);
                return { roomMessages: tempMessages };
            });
        });

    }

    // componentDidMount(){
    //     axios.get('/api/getMessages')
    //     .then(res=>{
    //         console.log(res.data)

    //         this.setState({
    //             messages: res.data
    //         })
    //     })
    // }

    // joinChat(){
    //     this.setState({ joined: true });

    //     socket.emit("join-chat", { name: this.state.name})
    // }

    sendMessage(){
        socket.emit("send-message", {
            name: this.state.name,
            message: this.state.message
        })
    }

    joinRoom(){
        this.setState({ roomJoined: true });

        socket.emit("join-room", { room: this.props.room });
        console.log('joining')
    }

    sendRoomMessage(){
        // console.log(this.props.inputBar)
        socket.emit("send-room-message", {
            name: this.state.name,
            room: this.state.room,
            message: this.props.inputBar
        });
    }

    handletest(){

        console.log(this.state)
    }

    handleRoomChange(e){
        this.props.updateRoom(e.target.value)

        console.log(this.props.room)
    }

    renderMessages(){

        if(this.props.room === ""){

        
        return this.state.messages.map((message) =>{
            // console.log('hey')
            return(
                <div className = 'message-box'>
                    <span className = 'message'>{message}</span>
                </div>
                
            )
        })
        } else {
            return this.state.roomMessages.map((message) => {
                // console.log('ho')
                return(
                    <div className = 'message-box'>
                        <span className = 'message'>{message}</span>
                    </div>
                )
            })
        }
    }

    
    render(){
        // console.log(this.state.messages)
        // console.log(this.props.sideDrawerOpen)
        let sideDrawer = null;
        let backdrop = null;
        let test = 'test';
        

        if(this.props.sideDrawerOpen){
            sideDrawer = <SideDrawer url = '/'/>;
            backdrop = <BackDrop url = '/'/>;
            test = 'test-open'
        }

    

        return(
            <div className = 'app'>
                <div className = 'background'>
                    <div className = 'left'>
                        <div className={test}>
                            {sideDrawer}
                            {backdrop}
                        </div>
                    </div>
                    <div className = 'right'>
                            <NavTop url = '/'/>             
                        <div className ='text-chat'>
                            <input onChange={this.handleRoomChange}></input>
                            <button onClick= {this.sendRoomMessage}>Send</button>
                            <button onClick = {this.joinRoom}>Room</button>
                            <button onClick={this.handletest}>test</button>
                            {this.renderMessages()}
                        </div>
                            <InputBar url = '/'/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(duckState) {
    return {
        sideDrawerOpen: duckState.sideDrawerOpen,
        inputBar: duckState.inputBar,
        room: duckState.room
    }
}

export default connect(mapStateToProps, { updateSideDrawerOpen, updateInputBar, updateRoom})(Main);