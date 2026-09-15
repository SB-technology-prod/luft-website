// app/fonts.ts
import { Tajawal } from 'next/font/google';
import localFont from 'next/font/local';

export const switzer = localFont({
  src: [
    {
      path: './Switzer/Switzer-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: './Switzer/Switzer-VariableItalic.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-switzer',
  display: 'swap',
});

export const tajwal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajwal',
  display: 'swap',
});
