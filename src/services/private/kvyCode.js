import { privateAPi } from '.';

export const kvyCodeApi = privateAPi.injectEndpoints({
    endpoints: build => ({
        getKvyCodes: build.query({
            query: body => ({
                url: '/booking/kvy-codes/',
                method: 'GET',
                params: body,
            }),
            providesTags: ['getKvyCode'],
        }),
        addKvyCodes: build.mutation({
            query: body => ({
                url: '/booking/kvy-codes/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['getKvyCode'],
        }),
        getSingleKvyCode: build.query({
            query: id => ({
                url: `/booking/kvy-codes/${id}/`,
                method: 'GET',
            }),
            providesTags: ['getKvyCode'],
        }),
        editKvyCodes: build.mutation({
            query: body => ({
                url: `/booking/kvy-codes/${body?.id}/`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['getKvyCode'],
        }),
        deleteKvyCode: build.mutation({
            query: id => ({
                url: `/booking/kvy-codes/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getKvyCode'],
        }),

    }),
});

export const { useGetKvyCodesQuery,
    useAddKvyCodesMutation,
    useEditKvyCodesMutation,
    useGetSingleKvyCodeQuery,
    useDeleteKvyCodeMutation } = kvyCodeApi;
