import React, { useState } from 'react';
import { Button, Form, Input, Table, Dropdown, Menu } from 'antd';
import './NoteCardTable.scss'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { EllipsisOutlined, DownOutlined, PlusOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';



const NoteCardTableView = (props) => {
  const [classID, levelID, group] = useOutletContext()
  const params = useParams()
  const noteData = JSON.parse(localStorage.getItem('noteCards'));
  const [dataSource, setDataSource] = useState(noteData);
  const navigate = useNavigate()

  if (group.toLowerCase() === 'teacher') {
    var createLink = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID +
      "/noteCardTable/create"
    var updateLink = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID +
      "/noteCardTable/update"
  } else if (group.toLowerCase() === 'coordinator') {
    var createLink = `/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList/noteCardTable/create`
    var updateLink = `/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList/noteCardTable/update`
  }


  const defaultColumns = [
    {
      title: 'Code',
      dataIndex: 'code',
      className: 'code',
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      className: 'prenom',
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      className: 'nom',
    },
    {
      title: 'Partiel',
      dataIndex: 'intra',
      editable: false,
      className: 'partiel',
    },
    {
      title: 'Final',
      dataIndex: 'examen',
      editable: false,
      className: 'final',
    },
  ];


  const navigateToCreate = () => {
    navigate(createLink);
  };

  const navigateToUpdate = () => {
    navigate(updateLink);
  };


  const navigateToSubmit = () => {
    // Logique pour le clic sur "Soumettre"
    console.log("Soumettre");
  };

  const navigateToSubmitIntra = () => {
    // Logique pour le clic sur "Soumettre intra"
    console.log("Soumettre intra");
  };

  const navigateToSubmitFinal = () => {
    // Logique pour le clic sur "Soumettre final"
    console.log("Soumettre final");
  };

  const submitMenu = (
    <Menu>
      <Menu.Item key="create" onClick={navigateToCreate}>
        <PlusOutlined /> Ajouter
      </Menu.Item>
      <Menu.Item key="edit" onClick={navigateToUpdate}>
        <EditOutlined /> Modifier
      </Menu.Item>
      <Menu.SubMenu key="submit" title={<span><SaveOutlined /> Soumettre</span>}>
        <Menu.Item key="submitIntra" onClick={navigateToSubmitIntra}>
          Soumettre Partiel
        </Menu.Item>
        <Menu.Item key="submitFinal" onClick={navigateToSubmitFinal}>
          Soumettre Final
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 40, // Set the desired page size here
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <div>
      {/* <Dropdown overlay={menu}>
      <Button icon={<EllipsisOutlined />} className="custom-button" />
      </Dropdown> */}
      <Dropdown overlay={submitMenu}>
        <Button className="custom-button">
          <span className="custom-button-text">Options</span>
          <EllipsisOutlined />
        </Button>
      </Dropdown>
      <Table
        bordered
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleTableChange}
        columns={defaultColumns}
        locale={{
          emptyText: 'Pas de données disponibles', // Personnalisez le message ici
        }}
      />
    </div>
  );
};
export default NoteCardTableView;

// import React, { useState } from 'react';
// import { Button, Form, Input, Table, Dropdown, Menu } from 'antd';
// import './NoteCardTable.scss'
// import { useCreateGradesMutation } from '../../api/ApiEndpoints';
// import { useNavigate, useOutletContext } from 'react-router-dom';
// import { EllipsisOutlined, DownOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';



// const NoteCardTableView = (props) => {

//   const [classID, periodID, levelID] = useOutletContext()

//   const noteData = JSON.parse(localStorage.getItem('noteCards'));
//   const [dataSource, setDataSource] = useState(noteData);
//   const navigate = useNavigate()
//   const createLink = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID +
//     "/noteCardTable/create"
//   const updateLink = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID +
//     "/noteCardTable/update"

//   const defaultColumns = [
//     {
//       title: 'Code',
//       dataIndex: 'code',
//       className: 'code',
//     },
//     {
//       title: 'Prénom',
//       dataIndex: 'prenom',
//       className: 'prenom',
//     },
//     {
//       title: 'Nom',
//       dataIndex: 'nom',
//       className: 'nom',
//     },
//     {
//       title: 'Partiel',
//       dataIndex: 'intra',
//       editable: false,
//       className: 'partiel',
//     },
//     {
//       title: 'Final',
//       dataIndex: 'examen',
//       editable: false,
//       className: 'final',
//     },
//   ];


//   const navigateToCreate = () => {
//     navigate(createLink);
//   };

//   const navigateToUpdate = () => {
//     navigate(updateLink);
//   };

//   const menu = (
//     <Menu>
//       <Menu.Item key="create" onClick={navigateToCreate}>
//         <PlusOutlined /> Ajouter
//       </Menu.Item>
//       <Menu.Item key="edit" onClick={navigateToUpdate}>
//         <EditOutlined /> Modifier
//       </Menu.Item>
//     </Menu>
//   );

//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 40, // Set the desired page size here
//   });

//   const handleTableChange = (pagination) => {
//     setPagination(pagination);
//   };

//   return (
//     <div>
//       {/* <Dropdown overlay={menu}>
//       <Button icon={<EllipsisOutlined />} className="custom-button" />
//       </Dropdown> */}
//       <Dropdown overlay={menu}>
//         <Button className="custom-button">
//           <span className="custom-button-text">Options</span>
//           <EllipsisOutlined />
//         </Button>
//       </Dropdown>
//       <Table
//         bordered
//         dataSource={dataSource}
//         pagination={pagination}
//         onChange={handleTableChange}
//         columns={defaultColumns}
//         locale={{
//           emptyText: 'Pas de données disponibles', // Personnalisez le message ici
//         }}
//       />
//     </div>
//   );
// };
// export default NoteCardTableView;
