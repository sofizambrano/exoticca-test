import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Tabs.module.css';

interface Tab {
  label: string;
  value: string | null;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('status');

  const handleTabClick = (status: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    params.delete('search');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles.wrapper}>
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}
          className={`${styles.tab} ${
            activeTab === tab.value && styles.active
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
