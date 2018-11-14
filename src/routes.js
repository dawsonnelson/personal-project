import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from './Components/Auth/Auth'

export default (

    <Switch>
        <Route exact path = '/' component={Auth}/>
    </Switch>
)