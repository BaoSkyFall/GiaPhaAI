import React, { useEffect } from 'react';
import { Row, Col, Card, Statistic, Typography, List, Avatar, Skeleton } from 'antd';
import { TeamOutlined, BookOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/types';
import { fetchFeaturedBlogPosts } from '@/redux/slice/blogSlice';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { featuredPosts, isLoading } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(fetchFeaturedBlogPosts(5));
  }, [dispatch]);

  return (
    <div>
      <Title level={2}>Gia phả AI</Title>
      <Paragraph>
        Hệ thống quản lý gia phả kết hợp công nghệ AI hiện đại giúp lưu trữ và tra cứu thông tin gia đình một cách dễ dàng.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Thành viên gia đình"
              value={120}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Bài viết tin tức"
              value={38}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Lượt truy cập"
              value={1523}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Title level={3}>Tin tức nổi bật</Title>
      <List
        itemLayout="horizontal"
        dataSource={featuredPosts}
        loading={isLoading}
        renderItem={(item) => (
          <List.Item
            onClick={() => navigate(`/blog/posts/${item._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <Skeleton avatar title={false} loading={isLoading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.thumbnailUrl || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                title={item.title}
                description={item.description}
              />
              <div>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default HomePage; 