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
      providesTags: ['GetCalenderBookings'],
    }),
    addBooking: build.mutation({
      query: payload => ({
        url: '/booking/bookings/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['GetCalenderBookings'],
    }),
  }),
});

export const {
  useGetCalenderBookingsQuery,
  useAddBookingMutation
} = calenderApi;
