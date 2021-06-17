import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";

const PrivateRoute = (props) => {
    const doCheckAuthentication = () => {
        const token = localStorage.getItem('token');
        const decoded = token && jwt_decode(token);
        const expireTime = moment.unix(decoded.exp).format('DD/MM/YY HH:mm');
        console.log('%c  expireTime:', 'color: #0e93e0;background: #aaefe5;', expireTime);
        const currentTime = moment().format('DD/MM/YY HH:mm');
        // return moment(currentTime).isBefore(expireTime);
        return true;
    }

    const isAuthenticated = doCheckAuthentication();

    return isAuthenticated
    ? (<Route  path={props.path}  exact={props.exact} component={props.component} />)
    : (<Redirect  to="/"  />);
}

export default PrivateRoute;