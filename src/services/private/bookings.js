/* eslint-disable no-sequences */
import { privateAPi } from '.';

export const bookingApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getBookings: build.query({
      query: body => ({
        url: '/booking/bookings/',
        method: 'GET',
        params: body,
      }),
      providesTags: ['GetBookings'],
    }),
    getBooking: build.query({
      query: id => ({
        url: `/booking/bookings/${id}/`,
        method: 'GET',
      }),
      providesTags: ['GetBooking'],
    }),
    updateBooking: build.mutation({
      query: body => ({
        url: `/booking/bookings/${body?.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['GetBookings', 'GetBooking'],
    }),

    getClientFeedback: build.query({
      query: params => ({
        url: '/api/dashboard/supplier-feedbacks/',
        method: 'GET',
        params,
      }),
      providesTags: ['GetFeedback'],
    }),

    addFeedback: build.mutation({
      query: body => ({
        url: '/booking/service-feedback/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetFeedback', 'GetBooking'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useUpdateBookingMutation,
  useAddFeedbackMutation
} = bookingApi;
