import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { callLogin, callGetProfile } from '@/config/api';
import { IUser, IAccount, IBackendRes } from '@/types/backend';

interface IAccountState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser | null;
  token: string;
  refreshToken: {
    status: boolean;
    message: string;
  }
}

const initialState: IAccountState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: '',
  refreshToken: {
    status: false,
    message: ''
  }
};

export const handleLoginRedux = createAsyncThunk(
  'account/login',
  async ({ email, password }: { email: string, password: string }) => {
    const res = await callLogin(email, password);
    if (res && res.data && res.data.data) {
      const accountData = res.data.data;
      const token = accountData.access_token;
      if (token) {
        localStorage.setItem('access_token', token);
      }
      return {
        user: accountData.user,
        token,
      };
    }
    return null;
  }
);

export const handleGetProfileRedux = createAsyncThunk(
  'account/profile',
  async () => {
    const res = await callGetProfile();
    if (res && res.data && res.data.data) {
      return res.data.data;
    }
    return null;
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.removeItem('access_token');
      state.isAuthenticated = false;
      state.user = null;
      state.token = '';
    },
    setRefreshTokenAction: (state, action: PayloadAction<{status: boolean, message: string}>) => {
      state.refreshToken.status = action.payload.status;
      state.refreshToken.message = action.payload.message;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginRedux.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleLoginRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.token = action.payload.token || '';
          state.user = action.payload.user || null;
        }
      })
      .addCase(handleLoginRedux.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = '';
      })
      .addCase(handleGetProfileRedux.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleGetProfileRedux.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload as IUser;
        }
      })
      .addCase(handleGetProfileRedux.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = '';
      });
  },
});

export const { setUserInfo, setLogout, setRefreshTokenAction } = accountSlice.actions;

export default accountSlice.reducer; 