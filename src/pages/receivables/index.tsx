import { Header } from '@/components/header';
import { HandCoins } from 'lucide-react';
import { ListReceivables } from './components';
import { StepsProvider } from './providers/steps';

export const ReceivablePage = () => {
	return (
		<div className="flex flex-col w-full">
			<Header title="Contas a receber" Icon={HandCoins} />

			<StepsProvider>
				<ListReceivables />
			</StepsProvider>
		</div>
	);
};
