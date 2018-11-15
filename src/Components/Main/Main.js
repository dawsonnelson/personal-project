import React, {Component} from 'react'
import './Main.css'
import './Nav top/NavTop'
import NavTop from './Nav top/NavTop';

export default class Main extends Component {




    render(){
        return(
            <div className = 'app'>
                <div className = 'background'>
                    <div className = 'nav'>
                        <NavTop url = '/'/>
                    </div>
                    <div className='side-bar'>
                    
                    </div>
                    <div className ='text-chat'>

                    </div>
                    <div className='input-bar'>
                        
                    </div>
                </div>
            </div>
        )
    }
}