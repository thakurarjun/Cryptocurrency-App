import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "4f777ad0f1msh038546b63ec6eb4p10f0c9jsn8613d9d0ea19",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (newsCategory, count=10) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

