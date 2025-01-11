import { privateAPi } from '.';

export const chartsApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getBookingPiChart: build.query({
      query: body => ({
        url: '/booking/booking-pi-chart/',
        method: 'GET',
        params: body,
      }),
      providesTags: ['GetBookingPiChart'],
    }),

    getUserOccupancy: build.query({
      query: body => ({
        url: '/booking/dashboard-user-occupancy/',
        method: 'GET',
        params: body,
      }),
      providesTags: ['GetUserOccupancy'],
    }),

    getBookingDashboard: build.query({
      query: body => ({
        url: '/booking/booking-dashboard/',
        method: 'GET',
        params: body,
      }),
      providesTags: ['GetBookingDashboard'],
    }),

  }),
});

export const {
  useGetBookingPiChartQuery,
  useGetUserOccupancyQuery,
  useGetBookingDashboardQuery,
} = chartsApi;
