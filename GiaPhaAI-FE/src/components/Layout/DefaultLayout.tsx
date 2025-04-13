import React from 'react';
import { Layout, Menu, Button, Dropdown, theme, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/types';
import { callLogout } from '@/config/api';
import { setLogout } from '@/redux/slice/accountSlice';

const { Header, Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.account);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: async () => {
        await callLogout();
        dispatch(setLogout());
        navigate('/login');
      },
    },
  ];

  const menuItems = [
    {
      key: 'dashboard',
      label: 'Trang chủ',
      onClick: () => navigate('/'),
    },
    {
      key: 'family-tree',
      label: 'Phả Đồ',
      onClick: () => navigate('/family-tree'),
    },
    {
      key: 'blog',
      label: 'Tin tức',
      onClick: () => navigate('/blog'),
    },
    {
      key: 'admin',
      label: 'Quản trị',
      children: [
        {
          key: 'user-management',
          label: 'Quản lý người dùng',
          onClick: () => navigate('/admin/users'),
        },
        {
          key: 'role-management',
          label: 'Quản lý vai trò',
          onClick: () => navigate('/admin/roles'),
        },
        {
          key: 'permission-management',
          label: 'Quản lý quyền hạn',
          onClick: () => navigate('/admin/permissions'),
        },
      ],
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ float: 'right', marginRight: 20 }}>
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button type="text" icon={<UserOutlined />}>
                {user?.name || 'Người dùng'}
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout; 