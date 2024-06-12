import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { IPromocode } from '../interface';

type TPromocode = {
  discount: number;
  discountType: 'retail' | 'percentage';
  title: string;
};

export const promocodeApi = createApi({
  reducerPath: 'promocode/query',
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
    getPromocode: builder.query<IPromocode[], void>({
      query: () => 'promocode',
      providesTags: () => ['tag'],
    }),
    findByName: builder.query<TPromocode, string>({
      query: (name: string) => 'promocode/name=' + name,
    }),
    createPromocode: builder.mutation<TPromocode, Partial<TPromocode>>({
      query: (newAttribute) => ({
        url: 'promocode',
        method: 'POST',
        body: newAttribute,
      }),
      invalidatesTags: ['tag'],
    }),
    destroy: builder.mutation<number, number>({
      query: (id: number) => ({
        url: 'promocode/' + id,
        method: 'DELETE'
      }),
      invalidatesTags: ['tag'],
    })
  }),
});

export const { useCreatePromocodeMutation, useGetPromocodeQuery, useDestroyMutation } = promocodeApi;
