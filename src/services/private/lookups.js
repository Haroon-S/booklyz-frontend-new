import { privateAPi } from '.';

export const lookupsApi = privateAPi.injectEndpoints({
  endpoints: build => ({
    getPriceGroups: build.query({
      query: () => '/assets/price-group/',
    }),
  }),
});

export const { useGetPriceGroupsQuery } = lookupsApi;
