import { privateAPi } from '.';

const brandsApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    sendPaymentStatus: build.mutation({
      query: payload => ({
        url: '/payments-and-subscription/create-paypal-payment/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['sendPaymentStatus'],
      invalidatesTags: ['loadUser'],
    }),
    getPaypalPlansList: build.query({
      query: () => ({
        url: '/payments-and-subscription/subscriptions/',
        method: 'GET',
      }),
      providesTags: ['getPaypalPlansList'],
    }),
    getPaypalPlansListById: build.query({
      query: id => ({
        url: `/payments-and-subscription/subscriptions/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getPaypalPlansListById'],
    }),
    addBookingStatus: build.mutation({
      query: payload => ({
        url: '/booking/bookings/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['GetBooking, GetBookings'],
    }),
    updateBookingPaymentStatus: build.mutation({
      query: id => ({
        url: `/booking/bookings/${id}/`,
        method: 'PATCH',
        body: {
          payment_status: true,
        },
      }),
      invalidatesTags: ['GetBooking'],
    }),
  }),
});

export const {
  useSendPaymentStatusMutation,
  useGetPaypalPlansListQuery,
  useGetPaypalPlansListByIdQuery,
  useAddBookingStatusMutation,
  useUpdateBookingPaymentStatusMutation,
} = brandsApi;
