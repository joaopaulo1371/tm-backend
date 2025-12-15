import { Transform } from 'class-transformer';

export function NormalizeCpf() {
  return Transform(({ value }) => {
    if (!value) return value;
    return value.replace(/[^\d]/g, '');
  });
}

export function FormatCpf() {
  return Transform(({ value }) => {
    if (!value) return value;
    const cleanCpf = value.replace(/[^\d]/g, '');
    if (cleanCpf.length === 11) {
      return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  });
}