import React, {Component} from 'react';
import './InputBar.css'
import add_button from '../../../assests/Add picture button.png'

export default class InputBar extends Component{


    render() {
        return(
                <div className = 'InputBar-Background'>
                    <div className = 'inputs'>
                        <button className = 'picture-input-button'><img className = 'picture-input-button-image' src ={add_button} alt=''/></button>
                        <input className = 'text-input'></input>
                        <button className = 'enter-button'>enter</button>  
                    </div> 
                </div>
        )
    }
}