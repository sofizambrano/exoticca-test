import '@/app/ui/global.css';
import { Hanken_Grotesk } from 'next/font/google';
import styles from './layout.module.css';
import HeaderBar from './ui/HeaderBar/HeaderBar';

const font = Hanken_Grotesk({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <div className={styles.wrapper}>
          <HeaderBar />
          {children}
        </div>
      </body>
    </html>
  );
}
