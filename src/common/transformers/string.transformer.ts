import { Transform } from 'class-transformer';

export function ToUpperCase() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  });
}

export function ToLowerCase() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }
    return value;
  });
}

export function Trim() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  });
}

export function ToBoolean() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true' || value === '1';
    }
    return Boolean(value);
  });
}