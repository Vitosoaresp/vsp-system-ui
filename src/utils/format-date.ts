import moment from 'moment-timezone';

moment.tz('America/Sao_Paulo');

export function formatDate(date?: string, format?: string): string {
	return moment(date).format(format ?? 'DD/MM/YYYY HH:mm:ss');
}
