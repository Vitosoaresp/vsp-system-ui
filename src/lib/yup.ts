import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    email: 'E-mail inválido',
    length: 'Deve ter exatamente ${length} caracteres',
    min: 'Deve ter pelo menos ${min} caracteres',
    max: 'Deve ter no máximo ${max} caracteres',
  },
  number: {
    min: 'Deve ser no mínimo ${min}',
    max: 'Deve ser no máximo ${max}',
    lessThan: 'Deve ser menor que ${less}',
    moreThan: 'Deve ser maior que ${more}',
  },
  array: {
    min: 'Deve ter no mínimo ${min} itens',
    max: 'Deve ter no máximo ${max} itens',
  },
});

export default yup;
