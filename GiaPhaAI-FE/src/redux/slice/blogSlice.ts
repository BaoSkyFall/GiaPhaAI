import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { callGetBlogPosts, callGetBlogPostById, callGetBlogCategories, callGetBlogTags, callGetFeaturedBlogPosts } from '@/config/api';
import { IBlogPost } from '@/types/backend';

interface IBlogState {
  isLoading: boolean;
  currentBlogPost: IBlogPost | null;
  blogPosts: {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: IBlogPost[];
  };
  featuredPosts: IBlogPost[];
  categories: string[];
  tags: string[];
}

const initialState: IBlogState = {
  isLoading: false,
  currentBlogPost: null,
  blogPosts: {
    meta: {
      current: 1,
      pageSize: 10,
      pages: 0,
      total: 0,
    },
    result: [],
  },
  featuredPosts: [],
  categories: [],
  tags: [],
};

export const fetchBlogPosts = createAsyncThunk(
  'blog/fetchPosts',
  async (query: string = '') => {
    const res = await callGetBlogPosts(query);
    if (res && res.data && res.data.data) {
      return res.data.data;
    }
    return initialState.blogPosts;
  }
);

export const fetchBlogPostById = createAsyncThunk(
  'blog/fetchPostById',
  async (id: string) => {
    const res = await callGetBlogPostById(id);
    if (res && res.data && res.data.data) {
      return res.data.data;
    }
    return null;
  }
);

export const fetchBlogCategories = createAsyncThunk(
  'blog/fetchCategories',
  async () => {
    const res = await callGetBlogCategories();
    if (res && res.data && res.data.data) {
      return res.data.data;
    }
    return [];
  }
);

export const fetchBlogTags = createAsyncThunk(
  'blog/fetchTags',
  async () => {
    const res = await callGetBlogTags();
    if (res && res.data && res.data.data) {
      return res.data.data;
    }
    return [];
  }
);

export const fetchFeaturedBlogPosts = createAsyncThunk(
  'blog/fetchFeatured',
  async (limit: number = 5) => {
    const res = await callGetFeaturedBlogPosts(limit);
    if (res && res.data && res.data.data) {
      return res.data.data;
    }
    return [];
  }
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    resetBlogState: (state) => {
      return initialState;
    },
    setCurrentBlogPost: (state, action: PayloadAction<IBlogPost | null>) => {
      state.currentBlogPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogPosts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchBlogPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBlogPost = action.payload;
      })
      .addCase(fetchBlogPostById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchBlogCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchBlogTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(fetchFeaturedBlogPosts.fulfilled, (state, action) => {
        state.featuredPosts = action.payload;
      });
  },
});

export const { resetBlogState, setCurrentBlogPost } = blogSlice.actions;

export default blogSlice.reducer; 