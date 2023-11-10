import React from 'react'
import './UserListTable.scss'
import { Table } from 'antd';
const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
  },
  {
    title: 'Prenom',
    dataIndex: 'prenom',
  },
  {
    title: 'Nom',
    dataIndex: 'nom',
  },
];

function UserListTable(props) {

  return (
    <Table columns={columns}
      bordered
      dataSource={props.data} />
  )
}
export default UserListTable;
