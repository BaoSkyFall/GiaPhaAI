import { Action, ThunkAction } from '@reduxjs/toolkit';

// These will be the same types defined in store.ts
export type RootState = ReturnType<typeof import('./store').store.getState>;
export type AppDispatch = typeof import('./store').store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>; 