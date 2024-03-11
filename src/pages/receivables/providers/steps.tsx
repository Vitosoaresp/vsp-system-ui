import { createContext, useMemo, useState } from 'react';

type StepsContext = {
	step: number;
	handleChangeStep: (step: number) => void;
};

const StepsContext = createContext<StepsContext>({
	step: 0,
	handleChangeStep: () => {},
});

export const StepsProvider = ({ children }: { children: React.ReactNode }) => {
	const [step, setStep] = useState(0);

	const memoizedValue = useMemo(
		() => ({ step, handleChangeStep: setStep }),
		[step],
	);

	return (
		<StepsContext.Provider value={memoizedValue}>
			{children}
		</StepsContext.Provider>
	);
};

export default StepsContext;
