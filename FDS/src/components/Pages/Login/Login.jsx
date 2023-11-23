// // import React from 'react';
// // import Logo from '../../Logo/Logo';
// // import Header from '../../Header/Header';
// // import LoginForm from './LoginForm';
// // import Footer from '../../Footer/Footer'
// // import 'antd/dist/antd.css'
// // import './Login.scss'


// // import bienvenueImage from '/bienvenue.png';

// // function Login() {
// //   return (
// //     <div>
// //       <Header />
// //       <div className="container-fluid">
// //         <div className="row">
// //           <div className="col-md-6">
// //             <div className="col-xs-10 login-left-side">
// //               <div className="d-block d-sm-none top-logo">
// //                 <Logo LogoWidth="150" />
// //               </div>
// //               <LoginForm />
// //             </div>
// //           </div>
// //           <div className="col-md-6">
// //             <div className="col-sm-6 d-none d-sm-block login-right-side">
// //               <img
// //                 src={bienvenueImage}
// //                 alt="Bienvenue"
// //                 className="zoomable-image"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <div>
// //         <Footer />
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;




import React from 'react';
import Logo from '../../Logo/Logo';
import Header from '../../Header/Header';
import LoginForm from './LoginForm';
import Footer from '../../Footer/Footer';
import 'antd/dist/antd.css';
import './Login.scss';

import bienvenueImage from '/bienvenue.png';

function Login() {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 mx-auto">
            {/* <div className="d-block d-sm-none top-logo">
              <Logo LogoWidth="150" />
            </div> */}
            <LoginForm />
          </div>        
          <div className="col-12 col-lg-6 mx-auto mt-4">
            <img
              src={bienvenueImage}
              alt="Bienvenue"
              className="zoomable-image"
            />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Login;











