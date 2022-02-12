import React from 'react';

import ReactSelect from 'react-select';

import styles from './styles.module.css';

export default function Select({ id, name, value, options, placeholder, onChange, disabled }) {    
  return(
    <ReactSelect
      name={name}
      id={id}
      inputId={id}
      options={options}
      placeholder={placeholder}
      className={`${styles.select} ${disabled ? styles.disabledSelect : null}`}
      onChange={onChange}
      isDisabled={disabled}  
      value={value}    
    />
  )
}