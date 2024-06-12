// user.reducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBasket, IProduct } from '../interface';


interface BasketState {
  products: IBasket[],
  discount?: number;
  typeDiscount?: 'retail' | 'percentage';
  namePromocode?: string;
}
const initialProducts: IBasket[] = []

const initialState: BasketState = {
  products: initialProducts,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addBasket: (state, payload: PayloadAction<IProduct>) => {
      const candidate = state.products.findIndex(item => item.id === payload.payload.id);
      if (candidate) state.products[candidate].que += 1;
      else state.products.push({
        title: payload.payload.title,
        que: 1,
        id: payload.payload.id,
        img: payload.payload.images[0],
        price: payload.payload.price,
        discont: payload.payload.discont,
        typeDiscont: payload.payload.typeDiscont
      })
      localStorage.setItem('basket', JSON.stringify(state))
    },
    remove: (state, payload) => {
      const index = state.products.findIndex(item => item.id === payload.payload.id);
      state.products.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(state.products));
    },
    setBasket: (state, payload: PayloadAction<IBasket[]>) => {
      state.products = payload.payload;
    },
    changeQue: (state, payload: PayloadAction<{ id: number, que: number }>) => {
      const index = state.products.findIndex(item => item.id === payload.payload.id);
      state.products[index].que = payload.payload.que;
    },
    setPromocode: (state, payload: PayloadAction<{
      discount: number;
      typeDiscount: 'retail' | 'percentage';
      namePromocode: string;
    }>) => {
      state.discount = payload.payload.discount;
      state.namePromocode = payload.payload.namePromocode;
      state.typeDiscount = payload.payload.typeDiscount;
    }
  },

});
export const { addBasket, remove, setBasket, changeQue, setPromocode } = basketSlice.actions
export default basketSlice.reducer;
