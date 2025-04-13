import React, { useEffect, useState } from 'react';
import { Button, Table, Space, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/types';
import { fetchPermissions } from '@/redux/slice/permissionsSlice';
import { callCreatePermission, callUpdatePermission, callDeletePermission } from '@/config/api';
import { IPermission } from '@/types/backend';

const { Option } = Select;

const PermissionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { permissions, isLoading } = useSelector((state: RootState) => state.permissions);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPermission, setEditingPermission] = useState<IPermission | null>(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [dispatch, currentPage]);

  const fetchData = () => {
    dispatch(fetchPermissions(`current=${currentPage}&pageSize=10`));
  };

  const showModal = (permission?: IPermission) => {
    setEditingPermission(permission || null);
    if (permission) {
      form.setFieldsValue(permission);
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingPermission(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingPermission) {
        await callUpdatePermission(editingPermission._id, values);
        message.success('Cập nhật quyền thành công!');
      } else {
        await callCreatePermission(values);
        message.success('Tạo quyền mới thành công!');
      }
      
      setModalVisible(false);
      fetchData();
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await callDeletePermission(id);
      message.success('Xóa quyền thành công!');
      fetchData();
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: 'Tên quyền',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'API Path',
      dataIndex: 'apiPath',
      key: 'apiPath',
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
      render: (text: string) => (
        <span style={{ 
          color: text === 'GET' ? '#1890ff' : 
                 text === 'POST' ? '#52c41a' : 
                 text === 'PUT' || text === 'PATCH' ? '#faad14' : 
                 text === 'DELETE' ? '#ff4d4f' : 'default' 
        }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: IPermission) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa quyền này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>Quản lý Quyền hạn</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
        >
          Thêm mới
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={permissions.result} 
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: permissions.meta.total,
          onChange: handlePageChange,
        }}
        loading={isLoading}
      />

      <Modal
        title={editingPermission ? "Chỉnh sửa quyền" : "Thêm quyền mới"}
        open={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {editingPermission ? "Cập nhật" : "Tạo mới"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên quyền"
            rules={[{ required: true, message: 'Vui lòng nhập tên quyền!' }]}
          >
            <Input placeholder="Nhập tên quyền" />
          </Form.Item>
          
          <Form.Item
            name="apiPath"
            label="API Path"
            rules={[{ required: true, message: 'Vui lòng nhập API path!' }]}
          >
            <Input placeholder="Ví dụ: /api/permissions" />
          </Form.Item>
          
          <Form.Item
            name="method"
            label="Phương thức"
            rules={[{ required: true, message: 'Vui lòng chọn phương thức!' }]}
          >
            <Select placeholder="Chọn phương thức">
              <Option value="GET">GET</Option>
              <Option value="POST">POST</Option>
              <Option value="PUT">PUT</Option>
              <Option value="PATCH">PATCH</Option>
              <Option value="DELETE">DELETE</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="module"
            label="Module"
            rules={[{ required: true, message: 'Vui lòng nhập module!' }]}
          >
            <Input placeholder="Ví dụ: PERMISSIONS" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionsPage; 