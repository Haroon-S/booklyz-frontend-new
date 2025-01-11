import { publicApi } from '.';

export const companyServicesApi = publicApi.injectEndpoints({
  endpoints: build => ({
    getPublicCompany: build.query({
      query: params => ({
        url: '/services/public-company/',
        method: 'GET',
        params,
      }),
      providesTags: ['GetPublicCompany'],
    }),

    getPublicCompanyById: build.query({
      query: slug => `/services/public-company/${slug}/`,
      providesTags: ['GetPublicCompanyById'],
    }),

    getPublicService: build.query({
      query: params => ({
        url: '/services/public-services/',
        method: 'GET',
        params,
      }),
      providesTags: ['GetPublicService'],
    }),

    getPublicServiceById: build.query({
      query: slug => `/services/public-services/${slug}/`,
      providesTags: ['GetPublicServiceById'],
    }),
  }),
});

export const {
  useGetPublicCompanyQuery,
  useGetPublicCompanyByIdQuery,
  useGetPublicServiceQuery,
  useGetPublicServiceByIdQuery,
} = companyServicesApi;
