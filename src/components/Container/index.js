import React from 'react';

import Sidebar from '../../components/Sidebar';
import { useHiddenSidebar } from '../../context/HiddenSidebar';

import styles from './styles.module.css';

export default function Container({ children }) {
  const { isHidden } = useHiddenSidebar();

  return (
    <div className={styles.container}>
      <Sidebar />
      <div id={styles.contentId} className={isHidden ? styles.hidden : (styles.content)}>
        { children }
      </div>
    </div>
  );
}