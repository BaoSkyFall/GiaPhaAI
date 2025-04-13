import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLoginRedux } from '@/redux/slice/accountSlice';
import { AppDispatch } from '@/redux/types';

const { Title } = Typography;

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: LoginValues) => {
    setLoading(true);
    try {
      const result = await dispatch(handleLoginRedux({ email: values.email, password: values.password }));
      if (result.payload) {
        message.success('Đăng nhập thành công!');
        navigate('/');
      } else {
        message.error('Email hoặc mật khẩu không đúng!');
      }
    } catch (error) {
      message.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', marginTop: '10vh' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          Đăng nhập
        </Title>
        <Form
          form={form}
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Button type="link" onClick={() => navigate('/register')}>
              Chưa có tài khoản? Đăng ký ngay
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm; 