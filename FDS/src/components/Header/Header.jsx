
// Header.jsx

import React from 'react';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import './Header.scss'; // Assurez-vous d'importer le fichier de style
//import { FaLanguage, FaPhone } from 'react-icons/fa'; // Importez les icônes nécessaires


// function Header() {
//   return (
//     <div className='header'>
//       <div className="header-logo">
//         <Logo LogoWidth="250" />
//       </div>
//       <div className="header-options">
//         <div className="language-selector">Langue</div>
//         <NavLink to="/contact">Contactez-nous</NavLink>
//       </div>
//     </div>
//   );
// }

// export default Header;



function Header() {
  return (
    <div className='header'>
      <div className="header-logo">
        <NavLink to="/login">
          <Logo LogoWidth="250" />
        </NavLink>
      </div>
      <div className="header-options">
        <div className="language-selector">
          <select>
            <option value="fr">Français</option>
          </select>
        </div>
        <NavLink to="/contact">Contactez-nous</NavLink>
      </div>
    </div>
  );
}

export default Header;







