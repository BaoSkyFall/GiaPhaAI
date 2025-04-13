import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { callGetFamilyMembers, callGetFamilyMemberById } from '@/config/api';
import { IFamilyMember } from '@/types/backend';

interface IFamilyTreeState {
  isLoading: boolean;
  currentMember: IFamilyMember | null;
  familyMembers: {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: IFamilyMember[];
  };
}

const initialState: IFamilyTreeState = {
  isLoading: false,
  currentMember: null,
  familyMembers: {
    meta: {
      current: 1,
      pageSize: 10,
      pages: 0,
      total: 0,
    },
    result: [],
  },
};

export const fetchFamilyMembers = createAsyncThunk(
  'familyTree/fetchFamilyMembers',
  async (query: string = '') => {
    const res = await callGetFamilyMembers(query);
    if (res && res.data && res.data.data) {
      return res.data.data;
    }
    return initialState.familyMembers;
  }
);

export const fetchFamilyMemberById = createAsyncThunk(
  'familyTree/fetchFamilyMemberById',
  async (id: string) => {
    const res = await callGetFamilyMemberById(id);
    if (res && res.data && res.data.data) {
      return res.data.data;
    }
    return null;
  }
);

export const familyTreeSlice = createSlice({
  name: 'familyTree',
  initialState,
  reducers: {
    resetFamilyTreeState: (state) => {
      return initialState;
    },
    setCurrentFamilyMember: (state, action: PayloadAction<IFamilyMember | null>) => {
      state.currentMember = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilyMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFamilyMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.familyMembers = action.payload;
      })
      .addCase(fetchFamilyMembers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFamilyMemberById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFamilyMemberById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMember = action.payload;
      })
      .addCase(fetchFamilyMemberById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetFamilyTreeState, setCurrentFamilyMember } = familyTreeSlice.actions;

export default familyTreeSlice.reducer; 