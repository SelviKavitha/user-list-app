import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Login from './pages/Login';
import UserList from './userManagement/users/UserList';
import AppHeader from './components/AppHeader'; // Header with Elon Musk + Logout
import { ToastContainer } from 'react-toastify';
const { Content } = Layout;

// Layout wrapper to conditionally show header
const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideHeader = location.pathname === '/'; // Hide header on login page

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!hideHeader && <AppHeader />}
      <Content style={{ padding: '20px' }}>{children}</Content>
    </Layout>
  );
};

function App() {
  return (
    <>
      <Router basename="/user-list-app">
        <AppLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </AppLayout>
      </Router>
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;

