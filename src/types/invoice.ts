export interface InvoiceXmlReponse {
  produtos: {
    code: string;
    description: string;
    quantity: string;
    unity: string;
    unitaryValue: string;
    totalValue: string;
  }[];
  supplier: {
    cnpj: string;
    name: string;
    companyName: string;
    address: {
      city: string;
      uf: string;
      zipCode: string;
      neighborhood: string;
      street: string;
      number: string;
    };
  };
  invoiceValue: string;
}
