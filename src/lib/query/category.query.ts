// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from '../interface'; // Используйте ICategory вместо IAttribute
import { RootState } from '../store';
interface CreateCategory {
  // Изменено имя интерфейса
  value: string;
  description: string;
}
interface UpdateCategory {
  // Изменено имя интерфейса
  value?: string;
  description?: string;
}
export const categoryApi = createApi({
  // Изменено имя константы и объекта API
  reducerPath: 'category/query',
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
    getCategories: builder.query<Array<ICategory>, void>({
      // Изменено имя эндпоинта
      query: () => 'category', // Изменено имя эндпоинта
      providesTags: () => ['tag'],
    }),
    createCategory: builder.mutation<CreateCategory, Partial<CreateCategory>>({
      query: (newCategory) => ({
        url: 'category', // Изменено имя эндпоинта
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['tag'],
    }),
    destroyCategory: builder.mutation<number, number>({
      query: (id) => ({
        url: 'category/' + id, // Изменено имя эндпоинта
        method: 'DELETE',
      }),
      invalidatesTags: ['tag'],
    }),
    updateCategory: builder.mutation<ICategory, { id: number; data: UpdateCategory }>({
      query: ({ id, data }) => ({
        url: `category/${id}`, // Изменено имя эндпоинта
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['tag'],
    }),
    getByIdCategory: builder.query<ICategory, number>({
      // Изменено имя эндпоинта
      query: (id: number) => 'category/' + id, // Изменено имя эндпоинта
      providesTags: () => ['tag'],
    }),
    // Добавьте другие эндпоинты по необходимости
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation, useDestroyCategoryMutation, useUpdateCategoryMutation, useGetByIdCategoryQuery } = categoryApi; // Изменено имя константы
