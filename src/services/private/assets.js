/* eslint-disable no-sequences */
import { privateAPi } from '.';

export const assetsApi = privateAPi.injectEndpoints({
    endpoints: build => ({
        addAssets: build.mutation({
            query: body => ({
                url: '/assets/templates/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['GetAssets'],
        }),
        getAssets: build.query({
            query: body => ({
                url: '/assets/templates/',
                method: 'GET',
                params: body,
            }),
            providesTags: ['GetAssets'],
        }),
    }),
});

export const {
    useAddAssetsMutation,
    useGetAssetsQuery
} = assetsApi;
