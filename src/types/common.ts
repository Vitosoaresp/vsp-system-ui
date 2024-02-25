export interface Meta {
	total: number;
	currentPage: number;
	nextPage: number;
	prevPage: number;
	perPage: number;
}

export interface ApiPaginationResponse<T> {
	data: T[];
	meta: Meta;
}

export interface Address {
	id?: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	neighborhood: string;
	number: string;
}
