import { privateAPi } from '.';

export const patientsApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getPatients: build.query({
        query: body => ({
          url: '/booking/booking-users-list/',
          method: 'GET',
          params: body,
        }),
        providesTags: ['getPatients'],
      }),
  }),
});

export const { useGetPatientsQuery } = patientsApi;
