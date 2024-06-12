'use client';
import { Provider } from 'react-redux';
import { setupStore } from '../lib/store';
const store = setupStore();
export default function StoreProvider({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
