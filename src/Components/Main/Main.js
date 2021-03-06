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
import {updateUserName} from '../../ducks/reducer'
import {updatePassWord} from '../../ducks/reducer'
import {updateShowButton} from '../../ducks/reducer'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
// import deleteImage from '../assests/delete.png'
// import editImage from '../assests/edit.png'
import axios from 'axios';

import io from "socket.io-client";




// const drawerWidth = 240;
// const socket = io.connect(process.env.REACT_APP_SOCKETSURL);
const socket = io.connect();

class Main extends Component {
    constructor(props){
        super(props)

        this.state = {
            message:"",
            messages: [],
            name: "",
            roomMessage: "",
            roomMessages: [],
            showButton: true,
        };

        this.handletest = this.handletest.bind(this)
        this.handleRoomChange = this.handleRoomChange.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
        // this.sendRoomMessage = this.sendRoomMessage.bind(this)
        this.handleButton = this.handleButton.bind(this)
        this.logoutButton = this.logoutButton.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
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
            tempMessages.push(data);
            // this.setState({ roomMessages: tempMessages });
        });

        socket.on("send-room-message-received", data => {
            console.log(data)
            this.setState(() => {
                let tempMessages = [...this.state.roomMessages];
                tempMessages.push(data);
                return { roomMessages: tempMessages };
            });
            // this.reciveMessages(this.props.room)
        });

    }

    reciveMessages(room){
        axios.get(`/api/getMessages/${room}`)
        .then(res=>{
            console.log(res.data)

            this.setState({
                roomMessages: res.data
            })
        })
    }
    

    sendMessage(){
        socket.emit("send-message", {
            name: this.state.name,
            message: this.state.message
        })
    }

    joinRoom(){
        // this.setState({ roomJoined: true });

        socket.emit("join-room", { room: this.props.room });
        // console.log('joining')
    }

    // sendRoomMessage(){
    //     console.log(this.props.userName)
    //     socket.emit("send-room-message", {
    //         name: this.props.userName,
    //         room: this.state.room,
    //         message: this.props.inputBar
    //     });
    //     console.log(this.props.userName)
    // }

    handletest(){

        console.log(this.props)
    }

    handleRoomChange(e){
        this.props.updateRoom(e.target.value)
    }

    handleButton(){
        this.props.updateShowButton();
        this.joinRoom()
        this.reciveMessages(this.props.room)
        console.log('did it make it here')
    }

    handleDelete(i){
        console.log(i)
        axios.delete(`/api/delete/${i}`)
        .then(
            this.reciveMessages(this.props.room)
        )
    }

    handleEdit(i){
        const newMessage = this.props.inputBar
        console.log(this.props.inputBar)
        console.log(newMessage)
        axios.put(`/api/editMessage`,{
            newMessage,
            i
        } )
        .then(res=>{
            console.log(res.data)
            this.reciveMessages(res.data.channel_id)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    logoutButton(){
        axios.post('/auth/logout')
        .then( ()=>{
            this.props.history.push('/main');
        })
    }

    renderMessages(){

        if(this.props.room === ""){

        
        return this.state.messages.map((message) =>{
            // console.log('hey')
            return(
                <div className = 'message-box'>
                    <span className = 'message'>{message.message}</span>
                </div>
                
            )
        })
        } else {

            if(this.props.showButton === true){
                return []
            } else{
                return this.state.roomMessages.map((message) => {
                    // console.log(message)
                    if(message.live === null){
                        return(
                            <div className = 'message-box'>
                                <span className = 'message'>{message.user} : {message.message}</span>
                                <div className = 'delete-div'>
                                    <IconButton className = 'delete-button' onClick ={() => this.handleDelete(message.id)}><img className = "delete-image" src="https://cdn.discordapp.com/attachments/202974546100224000/519004507821309952/unknown.png" alt=""/></IconButton>
                                    <IconButton className = 'edit-button' onClick={() => this.handleEdit(message.id)}><img className = "edit-image" src="https://cdn.discordapp.com/attachments/202974546100224000/518998102468984833/edit-editor-pen-pencil-write-icon--4.png" alt = ""/></IconButton>
                                </div>
                            </div>
                        )
                    } else {
                        return(
                            <div className = 'message-box'>
                                <span className = 'message'>{message.user_id} : {message.message}</span>
                                <div className = 'delete-div'>
                                    <IconButton className = 'delete-button' onClick ={() => this.handleDelete(message.id)}><img className = "delete-image" src="https://cdn.discordapp.com/attachments/202974546100224000/519004507821309952/unknown.png" alt=""/></IconButton>
                                    <IconButton className = 'edit-button' onClick={() => this.handleEdit(message.id)}><img className = "edit-image" src="https://cdn.discordapp.com/attachments/202974546100224000/518998102468984833/edit-editor-pen-pencil-write-icon--4.png" alt = ""/></IconButton>
                                </div>
                            </div>
                        )
                    }
                })
            }
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
                            {/* <input onChange={this.handleRoomChange}></input>
                            <button onClick= {this.sendRoomMessage}>Send</button>
                            <button onClick = {this.joinRoom}>Room</button>
                            <button onClick={this.handletest}>test</button>
                            <button onClick={this.logoutButton}>logout</button> */}
                            <div className = 'show-messages'>
                                {this.props.showButton ? <button className = "see-messages-button" onClick={this.handleButton}>See messages</button> : null}
                            </div>
                            {this.renderMessages()}
                        </div>
                            <InputBar url = '/'/>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(duckState) {
    return {
        sideDrawerOpen: duckState.sideDrawerOpen,
        inputBar: duckState.inputBar,
        room: duckState.room,
        username: duckState.userName,
        password: duckState.passWord,
        showButton: duckState.showButton
    }
}

export default connect(mapStateToProps, { updateSideDrawerOpen, updateInputBar, updateRoom, updateUserName, updatePassWord, updateShowButton})(Main);




/// when redering in messages needs to order them by id