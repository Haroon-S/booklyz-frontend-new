/* eslint-disable no-sequences */
import { privateAPi } from '.';

export const categoriesApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query({
      query: body => ({
        url: '/assets/categories/',
        method: 'GET',
        params: body,
      }),
      providesTags: ['GetCategories'],
    }),

    // SUB CATEGORIES

    getSubCategories: build.query({
      query: body => ({
        url: '/api/assets/sub-categories/',
        method: 'GET',
        params: body,
      }),
      providesTags: ['GetSubCategories'],
    }),
    getSubCategoriesByid: build.query({
      query: id => `api/assets/sub-categories/?category=${id}`,
    }),
    getSubCategoriesDetails: build.query({
      query: params => ({
        url: 'api/service/services/',
        params,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useLazyGetSubCategoriesQuery,
  useGetSubCategoriesByidQuery,
  useGetSubCategoriesDetailsQuery,
} = categoriesApi;
