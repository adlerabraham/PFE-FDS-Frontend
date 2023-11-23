import React from 'react'
import './UserListTable.scss'
import { Table } from 'antd';
const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    className: 'code', 
  },

  {
    title: 'Nom',
    dataIndex: 'nom',
    className: 'nom',
  },
  
  {
    title: 'Prénom',
    dataIndex: 'prenom',
    className: 'prenom',
  },

];

function UserListTable(props) {

  return (
    <Table columns={columns}
      bordered
      dataSource={props.data} 
      pagination={{
        pageSize: 15, 
      }}
      locale={{
        emptyText: 'Pas de données disponibles', // Personnalisez le message ici
      }}
      />
  )
}
export default UserListTable;

