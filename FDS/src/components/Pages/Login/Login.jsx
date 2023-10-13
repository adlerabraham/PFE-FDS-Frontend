import React from 'react';
import Logo from '../../Logo/Logo';
import LoginForm from './LoginForm';
import Footer from '../../Footer/Footer'
import 'antd/dist/antd.css'
import './Login.scss'

function Login() {

  return (
    <div>
      <div className="background" >
        <div className="col-xs-10 col-sm-6 login-left-side">
          <div className="d-block d-sm-none top-logo">
            <Logo LogoWidth="150" />
          </div>
          <LoginForm />
        </div>
        <div className='col-sm-6 d-none d-sm-block login-right-side'>
          <Logo LogoWidth="300" />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Login
