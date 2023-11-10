import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

function Niveau(props) {
  const items = [
    {
      label: <a href={"/teacherDashboard/" + props.classIDProp + "/teacherclass/classParticipants/1"}>
        Niveau 1
      </a>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <a href={"/teacherDashboard/" + props.classIDProp + "/teacherclass/classParticipants/2"}>
        Niveau 2
      </a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <a href="">Niveau 2</a>,
      key: '3',
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Niveau
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}


export default Niveau;