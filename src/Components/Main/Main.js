import React, {Component} from 'react'
import './Main.css'
import './Nav top/NavTop'
import './Body/Input Bar/InputBar'
import NavTop from './Nav top/NavTop';
import InputBar from './Body/Input Bar/InputBar'
// import NavLeft from './Nav left/NavLeft'
import SideDrawer from '../SideDrawer/SideDrawer'
import BackDrop from '../Backdrop/Backdrop'
import { connect } from 'react-redux'
import {updateSideDrawerOpen} from '../../ducks/reducer'
import axios from 'axios';




// const drawerWidth = 240;

class Main extends Component {
    constructor(){
        super()

        this.state = {
            messages: []
        }
        
    }

    componentDidMount(){
        axios.get('/api/getMessages')
        .then(res=>{
            console.log(res.data)

            this.setState({
                messages: res.data
            })
        })
    }

    renderMessage(){
        return this.state.messages.map((message) =>{
            console.log(message)
            return(
                <div className = 'message-box'>
                <span className = 'message'>{message.message}</span>
                </div>
            )
        })
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
                            {this.renderMessage()}
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
    }
}

export default connect(mapStateToProps, { updateSideDrawerOpen})(Main);