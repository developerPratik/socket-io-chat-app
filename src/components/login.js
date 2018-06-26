import React from 'react';
import Axios from 'axios';
import * as AuthActions from '../actions/AuthActions';
import authStore from '../stores/AuthStore';
import { LoginUser } from '../api/AuthApi';
import '../styles/login.css';
import { actions } from '../constants';

export default class Login extends React.Component {


    constructor(props, context) {

        super(props, context);
        this.state = {
            username: '',
            password: ''
        }


    }

    componentWillMount() {
     
        if (authStore.getUser() || localStorage.getItem('user')) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {

        authStore.on(actions.auth.logged_in, function () {

        })
    }


    handleSubmit(event) {
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
      
        LoginUser(username, password)
            .then(response => {

                AuthActions.LoginUser(response.data.token);
                this.props.history.push('/');

            })
            .catch(error => {
                console.log(error);
                if (error.status == 401) {
                    alert('invalid credentials');
                }
            })

    }



    handleChange(e, field) {
        this.setState({
            [field]: e.target.value
        });
    }

    render() {

        return (
            <div className="cont_login_wrapper">
                <div className="cont_principal">
                    <div className="cont_centrar">
                        <div className="cont_login">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="cont_tabs_login">
                                    <ul className='ul_tabs'>
                                        <li className="active"><a onClick={() => { null }}>SIGN IN</a><span className="linea_bajo_nom"></span></li>
                                    </ul>
                                </div>
                                <div className="cont_text_inputs">
                                    <input type="text" className="input_form_sign " placeholder="NAME" name="name_us" />

                                    <input type="text" onChange={(e) => { this.handleChange(e, 'username') }} className="input_form_sign d_block active_inp" placeholder="EMAIL" name="emauil_us" value={this.state.username} />

                                    <input type="password" onChange={(e) => { this.handleChange(e, 'password') }} className="input_form_sign d_block  active_inp" placeholder="PASSWORD" name="pass_us" value={this.state.password} />
                                    <input type="password" className="input_form_sign" placeholder="CONFIRM PASSWORD" name="conf_pass_us" />

                                    <a href="#" className="link_forgot_pass d_block" >Forgot Password ?</a>
                                    <div className="terms_and_cons d_none">
                                        <p><input type="checkbox" name="terms_and_cons" /> <label htmlFor="terms_and_cons">Accept  Terms and Conditions.</label></p>

                                    </div>
                                </div>
                                <div className="cont_btn">
                                    <button className="btn_sign" type="submit">SIGN IN</button>

                                </div>

                            </form>
                        </div>

                    </div>


                </div>
            </div>

        );



    }


}
