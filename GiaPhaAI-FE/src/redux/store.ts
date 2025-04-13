import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlice';
import blogReducer from './slice/blogSlice';
import permissionsReducer from './slice/permissionsSlice';
import familyTreeReducer from './slice/familyTreeSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    blog: blogReducer,
    permissions: permissionsReducer,
    familyTree: familyTreeReducer,
  },
});

// Type definitions are now in types.ts to avoid circular dependencies