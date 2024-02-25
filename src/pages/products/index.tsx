import { AvatarMenu } from '@/components/avatar-menu';
import { useMe } from '@/hooks';
import { ListProducts } from './components';

export const ProductsPage = () => {
	const me = useMe();

	return (
		<div className='flex flex-col w-full'>
			<header className='flex justify-between w-full px-4 py-8 items-center border-b border-zinc-800'>
				<div className='ml-10'>
					<h1 className='text-zinc-50 text-xl font-bold uppercase'>
						Listagem de Produtos
					</h1>
				</div>
				<AvatarMenu user={me} />
			</header>

			<ListProducts />
		</div>
	);
};
