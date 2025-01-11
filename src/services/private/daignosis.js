import { privateAPi } from '.';

export const daignosisApi = privateAPi.injectEndpoints({
    endpoints: build => ({
        getDaignosis: build.query({
            query: body => ({
                url: '/booking/diagnosis/',
                method: 'GET',
                params: body,
            }),
            providesTags: ['getDiagnosis'],
        }),
        addDaignosis: build.mutation({
            query: body => ({
                url: '/booking/diagnosis/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['getDiagnosis'],
        }),
        getSingleDaignosis: build.query({
            query: id => ({
                url: `/booking/diagnosis/${id}/`,
                method: 'GET',
            }),
            providesTags: ['getDiagnosis'],
        }),
        editDaignosis: build.mutation({
            query: body => ({
                url: `/booking/diagnosis/${body?.id}/`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['getDiagnosis'],
        }),
        deleteDaignosis: build.mutation({
            query: id => ({
                url: `/booking/diagnosis/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getDiagnosis'],
        }),

    }),
});

export const { useGetDaignosisQuery,
    useAddDaignosisMutation,
    useEditDaignosisMutation,
    useGetSingleDaignosisQuery,
    useDeleteDaignosisMutation } = daignosisApi;
