import { Transform } from 'class-transformer';

export function ToNumber() {
  return Transform(({ value }) => {
    if (value === null || value === undefined || value === '') {
      return undefined;
    }
    const num = Number(value);
    return isNaN(num) ? value : num;
  });
}

export function ToInt() {
  return Transform(({ value }) => {
    if (value === null || value === undefined || value === '') {
      return undefined;
    }
    const num = parseInt(value, 10);
    return isNaN(num) ? value : num;
  });
}

export function ToFloat() {
  return Transform(({ value }) => {
    if (value === null || value === undefined || value === '') {
      return undefined;
    }
    const num = parseFloat(value);
    return isNaN(num) ? value : num;
  });
}