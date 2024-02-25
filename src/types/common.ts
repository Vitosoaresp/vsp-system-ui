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
