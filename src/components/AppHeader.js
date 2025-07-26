import React from 'react';
import { Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header style={{ backgroundColor: '#001626',height:'45px' }}>
      <div className="container-fluid d-flex justify-content-end align-items-center gap-3 text-white" style={{ height: '45px' }}>
        <div className="fw-semibold fs-6">Elon Musk</div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: 'red',
            borderRadius: '5px',
            width: 25,
            height: 25,
            cursor: 'pointer',
          }}
          onClick={() => window.location.href = '/'}
        >
          <LogoutOutlined style={{ color: '#fff', fontSize: 16 }} />
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
