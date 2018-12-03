import React, {Component} from 'react';
import { connect } from 'react-redux'
import {updateUserName} from '../../ducks/reducer'
import {updatePassWord} from '../../ducks/reducer'
import {updateUserId} from '../../ducks/reducer'
import axios from 'axios'
import './Auth.css'

class Auth extends Component {
    constructor(props){
        super(props);

        this.state = {

        }

        this.handleNameInput = this.handleNameInput.bind(this)
        this.handlePasswordInput = this.handlePasswordInput.bind(this)
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    // login(){
    //     let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
    //     let url = `${encodeURIComponent(window.location.origin)}/auth/callback`;
    //     window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
        
    // }

    handleNameInput(e){
        this.props.updateUserName(e.target.value)
        console.log(this.props)
    }

    handlePasswordInput(e){
        this.props.updatePassWord(e.target.value)
    }

    handleRegister(){
        // let {username, password} = this.props
        // console.log(this.props)
    
        
        axios.post('/api/auth/register', {username: this.props.userName, password: this.props.passWord}) 
        .then((res)=>{
            console.log(res.data[0].id)
            this.props.updateUserId(res.data[0].id)
            this.props.history.push('/Main')

        }).catch((err) => { console.log(err)})
    }

    handleLogin(){
        // console.log(this.props)
        axios.post('/api/auth/login', {username: this.props.userName, password: this.props.passWord})
        .then((res)=>{
            console.log(res.data[0].id)
            this.props.updateUserId(res.data[0].id)
            this.props.history.push('/Main')
            console.log(this.props)
            
        }).catch((err) => { console.log(err)})
    }

    render(){
        // console.log(process.env)
        return(
            <div id = 'app'>
                <div className = 'auth-background'>
                    <div className = 'log-box'>
                        <img className = 'logo' src ={''} alt = ''></img>
                        <div>
                            <span className = 'title'>Discord clone</span>
                        </div>
                        <div className = 'something'>
                            <button className = 'login-register' onClick ={this.handleRegister}>Register</button>
                            <button className = 'login-register' onClick ={this.handleLogin}>Login</button>
                        </div>
                        <div className = 'userName-input'>
                            <input className = 'userName-inputBar' onChange = {this.handleNameInput} placeholder = "Username"></input>
                            <input className = 'userName-inputBar' onChange = {this.handlePasswordInput} placeholder = "Password"></input>
                        </div>
                    </div>
                </div>
                
    
                
            </div>
        )
    }
}

function mapStateToProps(duckState) {
    return {
        userName: duckState.userName,
        passWord: duckState.passWord,
        userId: duckState.userId,
    }
}

export default connect(mapStateToProps, { updateUserName, updatePassWord, updateUserId})(Auth);