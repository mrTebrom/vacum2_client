import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

type TPromo = {
  title: string;
  description: string;
  discont: number;
  href: string;
  image: string;
};

export const promoApi = createApi({
  reducerPath: 'promo/query',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.token; // Получаем токен из Redux состояния
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['tag'],
  endpoints: (builder) => ({
    getPromo: builder.query<TPromo, void>({
      query: () => 'promo',
      providesTags: () => ['tag'],
    }),
    createPromo: builder.mutation<TPromo, Partial<TPromo>>({
      query: (newAttribute) => ({
        url: 'promo',
        method: 'POST',
        body: newAttribute,
      }),
      invalidatesTags: ['tag'],
    }),
  }),
});

export const { useGetPromoQuery, useCreatePromoMutation } = promoApi;
