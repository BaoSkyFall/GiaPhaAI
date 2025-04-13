import { store } from './store';
import { setRefreshTokenAction } from './slice/accountSlice';

export const dispatchRefreshTokenAction = (status: boolean, message: string) => {
  store.dispatch(setRefreshTokenAction({ status, message }));
}; 