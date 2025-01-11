/* eslint-disable no-sequences */
import { privateAPi } from '.';

export const calenderApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getCalenderBookings: build.query({
      query: body => ({
        url: '/booking/booking-details-for-calender-listing/',
        method: 'GET',
        params: body,
      }),
      providesTags: ['GetBookings'],
    }),
  }),
});

export const {
  useGetCalenderBookingsQuery,
} = calenderApi;
