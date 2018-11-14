import React, {Component} from 'react';
import './Auth.css'

export default class Auth extends Component {

    login(){
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`;
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
        
    }

    render(){
        console.log(process.env)
        return(
            <div id = 'app'>
                <div className = 'background'>
                    <div className = 'log-box'>
                        <img className = 'logo' src ={''} alt = ''></img>
                        <div>
                            <span className = 'title'>'Discord clone'</span>
                        </div>
                        <div className = 'something'>
                            <button className = 'login-register' onClick ={this.login}>Login/Register</button>
                        </div>
                    </div>
                </div>
                
    
                
            </div>
        )
    }
}