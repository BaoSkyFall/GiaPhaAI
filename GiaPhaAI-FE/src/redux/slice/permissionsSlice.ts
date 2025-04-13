import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { callGetPermissions, callGetPermissionById } from '@/config/api';
import { IPermission } from '@/types/backend';

interface IPermissionsState {
  isLoading: boolean;
  currentPermission: IPermission | null;
  permissions: {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: IPermission[];
  };
}

const initialState: IPermissionsState = {
  isLoading: false,
  currentPermission: null,
  permissions: {
    meta: {
      current: 1,
      pageSize: 10,
      pages: 0,
      total: 0,
    },
    result: [],
  },
};

export const fetchPermissions = createAsyncThunk(
  'permissions/fetchPermissions',
  async (query: string = '') => {
    const res = await callGetPermissions(query);
    if (res && res.data && res.data.data) {
      return res.data.data;
    }
    return initialState.permissions;
  }
);

export const fetchPermissionById = createAsyncThunk(
  'permissions/fetchPermissionById',
  async (id: string) => {
    const res = await callGetPermissionById(id);
    if (res && res.data && res.data.data) {
      return res.data.data;
    }
    return null;
  }
);

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    resetPermissionState: (state) => {
      return initialState;
    },
    setCurrentPermission: (state, action: PayloadAction<IPermission | null>) => {
      state.currentPermission = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPermissionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPermissionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPermission = action.payload;
      })
      .addCase(fetchPermissionById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetPermissionState, setCurrentPermission } = permissionsSlice.actions;

export default permissionsSlice.reducer; 