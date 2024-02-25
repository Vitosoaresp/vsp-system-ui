export function CPFValidation(cpf?: string): boolean {
	if (!cpf) return true;
	const onlyNumber = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

	// Verifica se o CPF possui 11 dígitos
	if (onlyNumber.length !== 11) {
		return false;
	}

	// Verifica se todos os dígitos são iguais
	if (/^(\d)\1{10}$/.test(onlyNumber)) {
		return false;
	}

	// Calcula os dígitos verificadores
	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += parseInt(onlyNumber.charAt(i)) * (10 - i);
	}

	let rest = sum % 11;
	const verifyingDigit1 = rest < 2 ? 0 : 11 - rest;

	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += parseInt(onlyNumber.charAt(i)) * (11 - i);
	}

	rest = sum % 11;
	const verifyingDigit2 = rest < 2 ? 0 : 11 - rest;

	// Verifica se os dígitos calculados são iguais aos informados
	return (
		verifyingDigit1 === parseInt(onlyNumber.charAt(9)) &&
		verifyingDigit2 === parseInt(onlyNumber.charAt(10))
	);
}

export function CNPJValidation(cnpj: string): boolean {
	const onlyNumbers = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos

	// Verifica se o CNPJ possui 14 dígitos
	if (onlyNumbers.length !== 14) {
		return false;
	}

	// Calcula os dígitos verificadores
	let sum = 0;
	let weight = 2;
	for (let i = 11; i >= 0; i--) {
		sum += parseInt(onlyNumbers.charAt(i)) * weight;
		weight = weight === 9 ? 2 : weight + 1;
	}

	let rest = sum % 11;
	const digitoVerificador1 = rest < 2 ? 0 : 11 - rest;

	sum = 0;
	weight = 2;
	for (let i = 12; i >= 0; i--) {
		sum += parseInt(onlyNumbers.charAt(i)) * weight;
		weight = weight === 9 ? 2 : weight + 1;
	}

	rest = sum % 11;
	const digitoVerificador2 = rest < 2 ? 0 : 11 - rest;

	// Verifica se os dígitos calculados são iguais aos informados
	return (
		digitoVerificador1 === parseInt(onlyNumbers.charAt(12)) &&
		digitoVerificador2 === parseInt(onlyNumbers.charAt(13))
	);
}
