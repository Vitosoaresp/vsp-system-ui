import { AvatarMenu } from '@/components/avatar-menu';
import { useMe } from '@/hooks';
import { ListSuppliers } from './components';

export const SuppliersPage = () => {
	const me = useMe();

	return (
		<div className="flex flex-col w-full">
			<header className="flex justify-between w-full px-4 py-8 items-center border-b border-zinc-800">
				<div className="md:ml-10">
					<h1 className="text-zinc-50 text-xl font-bold uppercase">
						Listagem de Fornecedores
					</h1>
				</div>
				<div className="space-x-4">
					<AvatarMenu user={me} />
				</div>
			</header>

			<ListSuppliers />
		</div>
	);
};
