import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user.slice';
import basketSlice from './slice/basket.slice';
import tokenSlice from './slice/token.slice'
import { attributeApi } from './query/attribute.query';
import { categoryApi } from './query/category.query';
import { productApi } from './query/product.query';
import { promoApi } from './query/promo.query';
import { promocodeApi } from './query/promocode.query';
const rootReducer = combineReducers({
  user: userReducer,
  basket: basketSlice,
  token: tokenSlice,
  [attributeApi.reducerPath]: attributeApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [promoApi.reducerPath]: promoApi.reducer,
  [promocodeApi.reducerPath]: promocodeApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (msg) => msg().concat(attributeApi.middleware).concat(categoryApi.middleware).concat(productApi.middleware)
      .concat(promoApi.middleware).concat(promocodeApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
