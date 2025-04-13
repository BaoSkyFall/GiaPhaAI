import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, List, Tag, Input, Select, Divider, Spin, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '@/redux/types';
import { fetchBlogPosts, fetchBlogCategories, fetchBlogTags } from '@/redux/slice/blogSlice';
import { SearchOutlined, TagOutlined, FileOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

const BlogListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { blogPosts, categories, tags, isLoading } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogCategories());
    dispatch(fetchBlogTags());
    fetchPosts();
  }, [dispatch, currentPage, selectedCategory, selectedTags, searchQuery]);

  const fetchPosts = () => {
    let query = `current=${currentPage}&pageSize=10`;
    
    if (searchQuery) {
      query += `&search=${searchQuery}`;
    }
    
    if (selectedCategory) {
      query += `&category=${selectedCategory}`;
    }
    
    if (selectedTags.length > 0) {
      selectedTags.forEach(tag => {
        query += `&tag=${tag}`;
      });
    }
    
    dispatch(fetchBlogPosts(query));
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleTagChange = (value: string[]) => {
    setSelectedTags(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPostItem = (item: any) => (
    <List.Item 
      key={item._id}
      onClick={() => navigate(`/blog/posts/${item._id}`)}
      style={{ cursor: 'pointer' }}
    >
      <Card 
        hoverable 
        cover={item.thumbnailUrl && <img alt={item.title} src={item.thumbnailUrl} style={{ height: 200, objectFit: 'cover' }} />}
        style={{ width: '100%' }}
      >
        <Tag color="blue">{item.category}</Tag>
        <Title level={4}>{item.title}</Title>
        <Paragraph ellipsis={{ rows: 2 }}>{item.description}</Paragraph>
        <div>
          {item.tags.slice(0, 3).map((tag: string) => (
            <Tag key={tag} color="default">
              <TagOutlined /> {tag}
            </Tag>
          ))}
        </div>
        <div style={{ marginTop: 8, color: 'gray', fontSize: 12 }}>
          {new Date(item.createdAt).toLocaleDateString('vi-VN')} • {item.viewCount} lượt xem
        </div>
      </Card>
    </List.Item>
  );

  return (
    <div>
      <Title level={2}>Tin tức & Bài viết</Title>
      <Paragraph>
        Cập nhật tin tức, sự kiện, văn hóa và lịch sử liên quan đến gia đình.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Search
            placeholder="Tìm kiếm bài viết..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
          />
        </Col>
        <Col xs={24} md={8}>
          <Select
            placeholder="Chọn danh mục"
            style={{ width: '100%' }}
            allowClear
            size="large"
            onChange={handleCategoryChange}
          >
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={8}>
          <Select
            mode="multiple"
            placeholder="Chọn tag"
            style={{ width: '100%' }}
            allowClear
            size="large"
            onChange={handleTagChange}
          >
            {tags.map(tag => (
              <Option key={tag} value={tag}>{tag}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Divider />

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
            dataSource={blogPosts.result}
            renderItem={renderPostItem}
            pagination={{
              current: currentPage,
              pageSize: 10,
              total: blogPosts.meta.total,
              onChange: handlePageChange,
              showSizeChanger: false,
            }}
          />
          
          {blogPosts.result.length === 0 && (
            <div style={{ textAlign: 'center', margin: '50px 0' }}>
              <FileOutlined style={{ fontSize: 48, color: '#ccc' }} />
              <p>Không tìm thấy bài viết nào</p>
              <Button type="primary" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setSelectedTags([]);
                setCurrentPage(1);
              }}>
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogListPage;