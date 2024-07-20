import '@/app/ui/global.css';
import { font } from '@/app/ui/fonts';
import styles from './layout.module.css';
import HeaderBar from './ui/HeaderBar/HeaderBar';

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
