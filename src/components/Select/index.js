import React from 'react';

import ReactSelect from 'react-select';

import styles from './styles.module.css';

export default function Select({ name, options, placeholder, onChange }) {
  return(
    <ReactSelect
      name={name}
      options={options}
      placeholder={placeholder}
      className={styles.select}
      onChange={onChange}
    />
  )
}