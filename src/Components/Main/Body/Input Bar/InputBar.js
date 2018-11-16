import React, {Component} from 'react';
import './InputBar.css'
import add_button from '../../../assests/Add picture button.png'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

export default class InputBar extends Component{


    render() {
        return(
                <div className = 'InputBar-Background'>
                    <div className = 'inputs'>
                        <IconButton className = 'picture-input-button' variant="contained"><Icon/></IconButton>
                        <input className = 'text-input'></input>
                        <IconButton className = 'enter-button'></IconButton>  
                    </div> 
                </div>
        )
    }
}


//<img className = 'picture-input-button-image' src ={add_button} alt=''/>