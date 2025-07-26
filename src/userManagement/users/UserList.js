import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCard from '../../components/UserCard';
import { addUser, deleteUser, editUser, fetchUsers, toggleView } from '../../app/userSlice';
import { Table, Button, Input, Modal, Form, message } from 'antd';
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { items, status, } = useSelector((state) => state.users);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [form] = Form.useForm();
  const [view, setView] = useState('table'); // or 'table'

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    dispatch(fetchUsers());
  }, [dispatch, token, navigate]);
  const filteredUsers = items.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );


  const handleCreateUser = (values) => {
    dispatch(addUser({ id: Date.now(), ...values }));
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleSubmitUser = (values) => {
    if (editingUser) {
      dispatch(editUser({ ...editingUser, ...values }));
    } else {
      dispatch(addUser({ id: Date.now(), ...values }));
    }
    setIsModalOpen(false);
    form.resetFields();
    setEditingUser(null);
  };
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    message.success('User deleted');
  };

  useEffect(() => {
    if (editingUser) {
      form.setFieldsValue(editingUser);
    }
  }, [editingUser, form]);

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      render: (url) => <img src={url} alt="avatar" width={50} style={{ borderRadius: '50%', objectFit: 'cover' }} />,
    },
    { title: 'Email', dataIndex: 'email', render: (text) => <span className="text-primary">{text}</span> },
    { title: 'First Name', dataIndex: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name' },
    {
      title: 'Action',
      render: (_, record) => (
        <>
          <Button
            size="medium"
            type="primary"
            onClick={() => {
              setEditingUser(record);
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }}
            style={{ marginRight: 8, borderRadius: '0px' }}
          >
            Edit
          </Button>
          <Button
            style={{ backgroundColor: '#ff4d4f', color: '#fff', borderRadius: '0px' }}
            size="middle"
            onClick={() => {
              setUserIdToDelete(record.id);
              setDeleteModalVisible(true);
            }}
          >
            Delete
          </Button>

        </>
      ),
    },
  ];



  if (status === 'loading') return <p>Loading users...</p>;

  return (
    <div style={{ padding: 24 }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', gap: 0 }}>
            <div onClick={() => setView('table')}
              style={{
                padding: '4px 8px',
                cursor: 'pointer',
                border: `1px solid ${view === 'table' ? '#1677ff' : '#ccc'}`,
                color: view === 'table' ? '#1677ff' : '#000',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <TableOutlined />
              <label style={{ fontSize: '13px' }}>
                Table
              </label>
            </div>

            <div
              onClick={() => setView('grid')}
              style={{
                padding: '4px 8px',
                cursor: 'pointer',
                border: `1px solid ${view === 'grid' ? '#1677ff' : '#ccc'}`,
                color: view === 'grid' ? '#1677ff' : '#000',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <UnorderedListOutlined />
              <label style={{ fontSize: '13px' }}>List</label>
            </div>
          </div>

        </div>
        <div className="d-flex align-items-center gap-2">

          <Input
            placeholder="input search text"
            style={{ width: 300, borderRadius: 2 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            suffix={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  height: '100%',
                }}
              >
                {searchText && (
                  <CloseCircleFilled
                    onClick={() => setSearchText('')}
                    style={{
                      color: '#999',
                      cursor: 'pointer',
                      alignSelf: 'center',
                      paddingRight: 8,
                    }}
                  />
                )}

                {/* Full-height vertical divider */}
                <div
                  style={{
                    width: 1,
                    backgroundColor: '#ccc',
                    margin: '0 8px',
                  }}
                />

                <SearchOutlined
                  style={{
                    color: '#aaa',
                    alignSelf: 'center',
                  }}
                />
              </div>
            }
          />

          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Create User
          </Button>
        </div>
      </div>

      {/* Views */}
      {view === 'grid' ? (
        <div className="container">
          <div className="row">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user}
                onEdit={(user) => {
                  setEditingUser(user);
                  setIsModalOpen(true);
                }}
                onDelete={(userId) => {
                  setUserIdToDelete(userId);           // Save which user to delete
                  setDeleteModalVisible(true);         // Open the confirmation modal
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}

      {/* Modal */}
      <Modal
        title={editingUser ? 'Edit User' : 'Create New User'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingUser(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmitUser}>
          <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="avatar" label="Profile Image URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              {editingUser ? 'Update' : 'Submit'}
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                setEditingUser(null);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Confirm Deletion"
        open={deleteModalVisible}
        onOk={() => {
          handleDelete(userIdToDelete); // Directly delete here
          setDeleteModalVisible(false); // Close the modal
        }}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>



    </div>
  );
};



export default UserList;
