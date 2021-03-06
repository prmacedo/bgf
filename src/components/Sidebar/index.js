import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { FiMenu, FiUser, FiBriefcase, FiClipboard, FiSettings, FiLogOut } from 'react-icons/fi';

import styles from './styles.module.css';

import logo from '../../assets/BGF2.png';
import { useHiddenSidebar } from '../../context/HiddenSidebar';
import { useUserData } from '../../context/UserData';

export default function Sidebar() {
  const { isHidden, setIsHidden } = useHiddenSidebar();
  const { user, logout } = useUserData();

  function handleLogout() {
    logout();    
  }

  return(
    <>
    <div
      className={`${styles.mobileBtn} ${styles.mobileBtnHidden}`}
      onClick={() => { setIsHidden(!isHidden) }}  
    >
      <FiMenu />
      <span className={styles.menuBtnHelpText}>Clique para {isHidden?"exibir":"esconder"} o menu</span>
    </div>
    <aside id={styles.sidebarId} className={isHidden ? styles.hidden : (styles.sidebar)}>
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
        <span>{user?.user?.name}</span>
      </div>

      <div className={styles.menu}>
        <div onClick={() => { setIsHidden(!isHidden) }}>
          <Link to="/clients" className={styles.menuItem}>
            <FiUser />
            <span>Clientes</span>
          </Link>
        </div>
        
        <div onClick={() => { setIsHidden(!isHidden) }}>
          <Link to="/assignees" className={styles.menuItem}>
            <FiBriefcase />
            <span>Cessionários</span>
          </Link>
        </div>
        
        <div onClick={() => { setIsHidden(!isHidden) }}>
          <Link to="/managers" className={styles.menuItem}>
            <FiClipboard />
            <span>Gerentes</span>
          </Link>
        </div>
        
        <div onClick={() => { setIsHidden(!isHidden) }}>
          <Link to="/settings" className={styles.menuItem}>
            <FiSettings />
            <span>Configurações</span>
          </Link>
        </div>
        
        <Link to="/" className={styles.menuItem}
          onClick={() => handleLogout()}
        >
          <FiLogOut />
          <span>Sair</span>
        </Link>
      </div>
    </aside>
    </>
  );
}