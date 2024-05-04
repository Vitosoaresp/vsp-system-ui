import { Product } from './product';

export interface Buy {
	supplierId: string;
	products: Partial<Product>[];
}
