import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { FiMenu, FiUser, FiBriefcase, FiClipboard, FiSettings, FiLogOut } from 'react-icons/fi';

import styles from './styles.module.css';

import logo from '../../assets/BGF2.png';

export default function Sidebar() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(()=>{
    toggleActiveClasses();
  }, [isHidden]);

  function toggleActiveClasses() {
    
  }

  return(
    <aside className={styles.sidebar}>
      <div
        className={styles.menuBtn}
        onClick={() => { setIsHidden(!isHidden) }}  
      >
        <FiMenu />
        <span className={styles.menuBtnHelpText}>Clique para {isHidden?"exibir":"esconder"} o menu</span>
      </div>

      <img src={logo} alt="Logo BGF" className={styles.logo} />

      <div className={styles.title}>
        Olá,<br />
        <span>Fulano de tal</span>
      </div>

      <div className={styles.menu}>
        <Link to="/" className={styles.menuItem}>
          <FiUser />
          <span>Clientes</span>
        </Link>
        
        <Link to="/" className={styles.menuItem}>
          <FiBriefcase />
          <span>Cessionários</span>
        </Link>
        
        <Link to="/" className={styles.menuItem}>
          <FiClipboard />
          <span>Gerentes</span>
        </Link>
        
        <Link to="/" className={styles.menuItem}>
          <FiSettings />
          <span>Configurações</span>
        </Link>
        
        <Link to="/" className={styles.menuItem}>
          <FiLogOut />
          <span>Sair</span>
        </Link>
      </div>
    </aside>
  );
}