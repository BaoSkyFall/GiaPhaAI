import React from 'react';
import LoginForm from '@/components/Auth/LoginForm';
import { Layout } from 'antd';

const { Content } = Layout;

const LoginPage: React.FC = () => {
  return (
    <Layout className="auth-layout">
      <Content>
        <LoginForm />
      </Content>
    </Layout>
  );
};

export default LoginPage; 