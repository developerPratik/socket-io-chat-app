import Axios from 'axios';


export function LoginUser(username, password){

    return Axios.post('/login', {username, password});

}