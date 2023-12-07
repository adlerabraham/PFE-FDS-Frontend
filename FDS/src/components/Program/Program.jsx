import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Program.scss'

function Program(props) {
  const params = useParams()
  var link
  if (params.acaYearId != undefined) {
    link = `/coordinatorDashboard/${props.programId}`
  } else {
    // link = `/coordinatorDashboard/${props.programId}`
    link = `./${props.programId}`
  }
  console.log(params.acaYearId);
  const getRandomClassID = () => {
    // Générer un identifiant de classe aléatoire (par exemple, entre 1 et 10)
    const randomClassID = Math.floor(Math.random() * 10) + 1;
    return 'class' + randomClassID;
  };

  return (
    <div className="program-container">
      <div className={`program-head ${getRandomClassID()}`}>
        <NavLink to={`./${props.programId}`}>{props.programName}</NavLink>
        <p>{props.programAbv}</p>
      </div>
      <div className="program-middle">

      </div>
      <div className="program-botton"></div>
    </div>
  )
}


export default Program;