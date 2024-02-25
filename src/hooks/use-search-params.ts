import { useSearchParams as useSearchParamsRouterDom } from 'react-router-dom';

export type ListParams = {
	page: number;
	sort: string;
	search: string;
	perPage: number;
	orderBy: string;
};

export const useSearchParams = (defaultParams?: Partial<ListParams>) => {
	const [params, setParams] = useSearchParamsRouterDom();

	const page = params.get('page') || defaultParams?.page || 1;
	const perPage = params.get('perPage') || defaultParams?.perPage || 20;
	const search = (params.get('search') || defaultParams?.search) as string;
	const sort = (params.get('sort') || defaultParams?.sort) as string;
	const orderBy = (params.get('orderBy') || defaultParams?.orderBy) as string;

	const handleSetParams = (newParams: Partial<ListParams>) => {
		setParams((params) => {
			Object.keys(newParams).forEach((key) => {
				params.set(`${key}`, String(newParams[key as keyof ListParams]));
			});
			return params;
		});
	};

	return {
		params: {
			page: Number(page),
			perPage: Number(perPage),
			orderBy,
			search,
			sort,
		},
		handleSetParams,
	};
};
