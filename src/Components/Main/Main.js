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



// const drawerWidth = 240;

class Main extends Component {
    constructor(){
        super()

        this.state = {

        }
        
    }

    render(){
        console.log(this.props.sideDrawerOpen)
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
                    {/* <div className = 'nav-left'>
                        <NavLeft url = '/'/>
                    </div> */}
                    <div></div>
                    <div className = 'nav'>
                        <NavTop url = '/'/>
                        <div className={test}>
                        {sideDrawer}
                        {backdrop}
                        </div>
                    </div>
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

function mapStateToProps(duckState) {
    return {
        sideDrawerOpen: duckState.sideDrawerOpen,
    }
}

export default connect(mapStateToProps, { updateSideDrawerOpen})(Main);