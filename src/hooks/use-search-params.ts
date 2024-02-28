import { useSearchParams as useSearchParamsRouterDom } from 'react-router-dom';

export type ListParams = {
	page: number;
	sort: string;
	search: string;
	perPage: number;
	orderBy: string;
	startAt?: string;
	endAt?: string;
	status?: string;
};

export const useSearchParams = (defaultParams?: Partial<ListParams>) => {
	const [params, setParams] = useSearchParamsRouterDom();

	const page = params.get('page') || defaultParams?.page || 1;
	const perPage = params.get('perPage') || defaultParams?.perPage || 20;
	const search = (params.get('search') || defaultParams?.search) as string;
	const sort = (params.get('sort') || defaultParams?.sort) as string;
	const orderBy = (params.get('orderBy') || defaultParams?.orderBy) as string;
	const startAt = params.get('startAt') || defaultParams?.startAt;
	const endAt = params.get('endAt') || defaultParams?.endAt;
	const status = params.get('status') || defaultParams?.status;

	const handleSetParams = (newParams: Partial<ListParams>) => {
		setParams(params => {
			Object.keys(newParams).forEach(key => {
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
			startAt,
			endAt,
			status,
		},
		handleSetParams,
	};
};
