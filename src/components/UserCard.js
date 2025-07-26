import React from 'react';
import { Card, Tooltip, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const avatarStyle = {
  width: 80,
  height: 80,
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: 12,
};

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="col-lg-3 col-sm-6 mb-4 d-flex justify-content-center">
      <div className="user-card-wrapper w-100 rounded">


        <div className="user-card-hover position-relative">
          <Card
            className="text-center w-100"
            bordered
            hoverable
            style={{
              padding: 16,
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              transition: 'all 0.3s',
            }}
          >
            <img src={user.avatar} alt={user.first_name} style={avatarStyle} />
            <h5 className="mt-2 mb-1">{user.first_name} {user.last_name}</h5>
            <p className="text-muted mb-0">{user.email}</p>
          </Card>
          {/* Hover icons in center */}
          <div className="hover-center-icons">
            <div className="icon-button edit-icon" onClick={() => onEdit(user)}>
              <EditOutlined />
            </div>
            <div className="icon-button delete-icon" onClick={() => onDelete(user.id)}>
              <DeleteOutlined />
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default UserCard;

