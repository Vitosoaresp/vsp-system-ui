export function formatInvoiceId(id: number): string {
	const prefix = 'INV';
	const minLength = 4;

	// Converte o número para string
	const idStr = id.toString();

	// Calcula o número de zeros a serem adicionados
	const numZeros = Math.max(minLength - idStr.length, 0);

	// Gera a string de zeros
	const zeros = '0'.repeat(numZeros);

	// Retorna a ID formatada
	return `${prefix}${zeros}${idStr}`;
}
