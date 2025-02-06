import { api } from '@/store/api';
import { InvoiceXmlReponse } from '@/types/invoice';

export const invoicesApi = api.injectEndpoints({
  endpoints: builder => ({
    uploadInvoice: builder.mutation<InvoiceXmlReponse, FormData>({
      query: body => ({
        url: '/invoices/xml',
        method: 'POST',
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'multipart/form-data');
          return headers;
        },
        body,
      }),
    }),
  }),
});

export const { useUploadInvoiceMutation } = invoicesApi;
