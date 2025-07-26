import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../app/authSlice';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e?.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser?.fulfilled.match(resultAction)) {
      navigate('/users');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: 400 }}>
        <form onSubmit={handleLogin}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white border-end-0">
              <UserOutlined />
            </span>
            <input
              type="email"
              className="form-control border-start-0"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e?.target?.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white">
              <LockOutlined />
            </span>
            <input
              type="password"
              className="form-control border-start-0"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e?.target?.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={status === 'loading'} >
            {status === 'loading' ? 'Logging in...' : 'Log in'}
          </button>

          {error && <div className="text-danger mt-3 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
