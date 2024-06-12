import { IProduct } from '../interface';
// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
type TProduct = Omit<IProduct, 'id'>;

export const productApi = createApi({
  reducerPath: 'product/query',
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
    getProducts: builder.query<IProduct[], void>({
      query: () => 'product',
      providesTags: () => ['tag'],
    }),
    createProduct: builder.mutation<TProduct, Partial<TProduct>>({
      query: (newProduct) => ({
        url: 'product',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['tag'],
    }),
    destroyProduct: builder.mutation<number, number>({
      query: (id) => ({
        url: 'product/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['tag'],
    }),
    updateProduct: builder.mutation<TProduct, { id: number; data: TProduct }>({
      query: ({ id, data }) => ({
        url: `product/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['tag'],
    }),
    getByIdProduct: builder.query<IProduct, number>({
      query: (id: number) => 'product/' + id,
      providesTags: () => ['tag'],
    }),
    uploadImages: builder.mutation<FormData, FormData>({
      query: (formData) => ({
        url: 'product/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation, useDestroyProductMutation, useUpdateProductMutation, useGetByIdProductQuery, useUploadImagesMutation } = productApi;
