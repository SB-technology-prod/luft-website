export const NOT_SPACES_ONLY = /^(?!\s+$)[\s\S]*$/;
export const NO_SPECIAL_CHARS = /^[A-Za-z\u0600-\u06FF\s]+$/;
export const NO_NUMBERS = /^[^0-9]*$/;
export const NUMBERS_ONLY = /^\d+$/;
export const EGYPTIAN_PHONE = /^01[0125][0-9]{8}$/;
export const NO_SCRIPTS = /<[^>]*>/;
export const NAME_REGEX = /^[A-Za-z\u0600-\u06FF\s]+$/;

export const PASSWORD_REGEX = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  special: /[^A-Za-z0-9]/,
} as const;
