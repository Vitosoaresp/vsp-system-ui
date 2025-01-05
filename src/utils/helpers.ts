import { Product } from '@/types/product';
import { ProductAction } from './enum';

export const emptyProduct: Product = {
  active: true,
  name: '',
  supplierId: '',
  code: 0,
  quantity: 0,
  grossPrice: 0,
  salesPrice: 0,
  description: '',
};

export const getProductHistoryActionLabel = (action: ProductAction): string => {
  const historyLabel = {
    [ProductAction.SELL]: 'Venda',
    [ProductAction.BUY]: 'Compra',
    [ProductAction.EDIT]: 'Edição',
    [ProductAction.CREATE]: 'Criação',
  };

  return historyLabel[action] || '';
};
