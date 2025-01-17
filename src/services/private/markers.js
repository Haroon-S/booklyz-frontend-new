/* eslint-disable no-sequences */
import { privateAPi } from '.';

export const markersApi = privateAPi.injectEndpoints({
    endpoints: build => ({
        addMarker: build.mutation({
            query: body => ({
                url: '/booking/journal-makers/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['GetMarkers'],
        }),
        updateMarker: build.mutation({
            query: ({body, id}) => ({
                url: `/booking/journal-makers/${id}/`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['GetMarkers'],
        }),
        getMarker: build.query({
            query: id => ({
                url: `/booking/journal-makers/${id}`,
                method: 'GET',
            }),
            providesTags: ['GetMarkers'],
        }),
    }),
});

export const {
    useAddMarkerMutation,
    useGetMarkerQuery,
    useUpdateMarkerMutation
} = markersApi;
