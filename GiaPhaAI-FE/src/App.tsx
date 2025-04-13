import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/types';
import { handleGetProfileRedux } from '@/redux/slice/accountSlice';
import viVN from 'antd/es/locale/vi_VN';

// Layouts
import DefaultLayout from '@/components/Layout/DefaultLayout';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';

// Public Pages
import HomePage from '@/pages/home/HomePage';
import BlogListPage from '@/pages/blog/BlogListPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Admin Pages
import PermissionsPage from '@/pages/admin/PermissionsPage';

const isAuthenticated = () => {
  return localStorage.getItem('access_token') ? true : false;
};

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

type GuestRouteProps = {
  children: JSX.Element;
};

const GuestRoute = ({ children }: GuestRouteProps) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated: authState } = useSelector((state: RootState) => state.account);
  
  useEffect(() => {
    if (isAuthenticated() && !authState) {
      dispatch(handleGetProfileRedux());
    }
  }, [authState, dispatch]);

  return (
    <ConfigProvider locale={viVN}>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }>
            <Route index element={<HomePage />} />
            <Route path="blog" element={<BlogListPage />} />
            
            {/* Admin Routes */}
            <Route path="admin">
              <Route path="permissions" element={<PermissionsPage />} />
              <Route path="roles" element={<div>Quản lý Vai trò</div>} />
              <Route path="users" element={<div>Quản lý Người dùng</div>} />
            </Route>
            
            {/* Family Tree Routes */}
            <Route path="family-tree" element={<div>Phả đồ gia đình</div>} />
            
            {/* Profile Route */}
            <Route path="profile" element={<div>Thông tin cá nhân</div>} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App; 