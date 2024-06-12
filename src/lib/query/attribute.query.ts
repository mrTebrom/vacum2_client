import { IAttribute, ICategory } from '../interface';
// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
type TAttribute = Omit<IAttribute, 'id'>;

export const attributeApi = createApi({
  reducerPath: 'attribute/query',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.token; // Получаем токен из Redux состояния
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), // Укажите ваш базовый URL API
  tagTypes: ['tag'],
  endpoints: (builder) => ({
    getAttributes: builder.query<IAttribute[], void>({
      query: () => 'attribute',
      providesTags: () => ['tag'],
    }),
    createAttribute: builder.mutation<TAttribute, Partial<TAttribute>>({
      query: (newAttribute) => ({
        url: 'attribute',
        method: 'POST',
        body: newAttribute,
      }),
      invalidatesTags: ['tag'],
    }),
    destroyAttribute: builder.mutation<number, number>({
      query: (id) => ({
        url: 'attribute/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['tag'],
    }),
    updateAttribute: builder.mutation<TAttribute, { id: number; data: TAttribute }>({
      query: ({ id, data }) => ({
        url: `attribute/${id}`, // Используйте корректный путь для вашего API
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['tag'],
    }),
    getByIdAttribute: builder.query<TAttribute, number>({
      query: (id: number) => 'attribute/' + id,
      providesTags: () => ['tag'],
    }),
    // Добавьте другие эндпоинты по необходимости
  }),
});

export const { useGetAttributesQuery, useCreateAttributeMutation, useDestroyAttributeMutation, useUpdateAttributeMutation, useGetByIdAttributeQuery } = attributeApi;
