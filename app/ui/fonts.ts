import { Inter, Lusitana, Noto_Sans, Noto_Sans_SC } from 'next/font/google';

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin']
});

export const notoSansSC = Noto_Sans_SC({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
});
