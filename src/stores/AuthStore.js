import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import { actions } from '../constants';
import jwt_decode from 'jwt-decode';

class AuthStore extends EventEmitter {

    constructor() {
        super();

        this.jwt = null;
        this.user = null;
    }

    getUser() {
        return this.user;
    }

    handeLoginActions(action) {

        let that = this;

        switch (action.type) {

            case actions.auth.logged_in:
     

                this.jwt = action.jwt;

                this.user = jwt_decode(action.jwt);

          
                that.emit('logged_in');

                break;

            case actions.auth.get_user:
                that.getUser();


            default:
                break;

        };

    }

    getJwt() {
        return this.jwt;
    }

    isLoggedIn() {
        return !!this.user;
    }



}


const authStore = new AuthStore();
Dispatcher.register(authStore.handeLoginActions.bind(authStore));

export default authStore;

