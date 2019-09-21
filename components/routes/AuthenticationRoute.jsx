import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const AuthenticationRoute = ({ Com, path, isAuth, exact, checkRoute, hasStorageData, ...args }) => {

    return (
       !isAuth && (path != '/') ? <Redirect to="/" from={path} />
            : <Route path={path} exact={exact ? true : false} render={props => (
                <Com {...props} {...args} />
            )} />
    );
}

export default AuthenticationRoute;