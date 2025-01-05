import { ListReceivables } from './components';
import { StepsProvider } from './providers/steps';

export const ReceivablePage = () => {
  return (
    <div className="flex flex-col w-full">
      <StepsProvider>
        <ListReceivables />
      </StepsProvider>
    </div>
  );
};
