// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Login from './pages/Login';
import UserList from './userManagement/users/UserList';
import AppHeader from './components/AppHeader'; // Header with Elon Musk + Logout

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
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;

