import React, {Component} from 'react'
import './Main.css'
import './Nav top/NavTop'
import './Body/Input Bar/InputBar'
import NavTop from './Nav top/NavTop';
import InputBar from './Body/Input Bar/InputBar'

export default class Main extends Component {




    render(){
        return(
            <div className = 'app'>
                <div className = 'background'>
                    <div className = 'nav'>
                        <NavTop url = '/'/>
                    </div>
                    {/* <div className='side-bar'>
                    
                    </div> */}
                    <div className ='text-chat'>
                        <span>text chat</span>
                    </div>
                    <div className='input-bar'>
                        <InputBar url = '/'/>
                    </div>
                </div>
            </div>
        )
    }
}