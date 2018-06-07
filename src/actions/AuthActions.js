import Dispatcher from '../dispatcher';
import jwt_decode from 'jwt-decode';
import {actions} from '../constants';

export function LoginUser(jwt){


    localStorage.setItem('auth_user', jwt);
    localStorage.setItem('user', JSON.stringify(jwt_decode(jwt)));
    Dispatcher.dispatch({
        type: actions.auth.logged_in,
        jwt: jwt
    })
}


export function LogoutUser(){


    localStorage.removeItem('auth_user');
    Dispatcher.dispatch({
        type: 'LOGOUT'
    });
}

export function getUser(){


    Dispatcher.dispatch({
        action: 'GET_USER'
    })
}
