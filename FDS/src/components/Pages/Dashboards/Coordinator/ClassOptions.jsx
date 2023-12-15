import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom';
import './ClassOptions.scss';
import { UserOutlined, FileTextOutlined, BellOutlined } from '@ant-design/icons';

function ClassOptions(props) {
  const params = useParams()
  let classID = params.classID

  const [clickedTab, setClickedTab] = useState(null);

  const handleTabClick = (tab) => {
    setClickedTab(tab === clickedTab ? null : tab);
  };


  // Effet de montage pour définir l'onglet actif lors de la première visite
  useEffect(() => {
    if (window.location.pathname === "coordinatorDashboard/" + params.programId + "/" + params.levelID + "/" + classID + "/classOptions") {
      // Si l'URL se termine par "/classOptions", alors c'est "flux"
      setClickedTab('flux');
    }
  }, [classID]);

  return (
    <div>
      <div className="class-header">
        <div className="class-header-text">
          <NavLink
            to="./"
            className={`text-option ${clickedTab === 'flux' ? 'clicked' : ''}`}
            onClick={() => handleTabClick('flux')}
          >
            <BellOutlined /> Flux
          </NavLink>
          <NavLink
            to={"./exam"}
            className={`text-option ${clickedTab === 'participants' ? 'clicked' : ''}`}
            onClick={() => handleTabClick('participants')}
          >
            <UserOutlined /> Examen
          </NavLink>
          <NavLink
            to={"./transcriptList"}
            className={`text-option ${clickedTab === 'noteCards' ? 'clicked' : ''}`}
            onClick={() => handleTabClick('noteCards')}
          >
            <FileTextOutlined /> Relevé
          </NavLink>
        </div>
        <div className="class-header-icon"></div>
      </div>
      <div className="class-body">
        <Outlet context={[classID]} />
      </div>
    </div>
  );
}

export default ClassOptions

