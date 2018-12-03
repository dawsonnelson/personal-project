import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Main from './Components/Main/Main'
import Channel from './Components/Channel/Channel'

export default (

    // <Switch>
    //     <Route exact path = '/' component={Auth}/>
    //     <Route path = '/Main' component={Main}/>
    // </Switch>

    // above is the correct code

    <Switch>
        <Route exact path = '/' component={Auth}/>
        <Route path = '/Main' component={Main}/>
        <Route path = '/Channel' component={Channel}/>

    </Switch>
)