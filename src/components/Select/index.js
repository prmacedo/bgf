import React from 'react';

import ReactSelect from 'react-select';

import styles from './styles.module.css';

export default function Select({ id, name, value, options, placeholder, onChange, disabled, type }) {    
  return(
    type === 'cep' 
    ?
    <ReactSelect
      name={name}
      id={id}
      inputId={id}
      options={options}
      placeholder={placeholder}
      className={`${styles.select} ${disabled ? styles.disabledSelect : null}`}
      onChange={onChange}
      isDisabled={disabled}
      value={{ value: value , label: (value || '--') }}
    />
    :
    <ReactSelect
      name={name}
      id={id}
      inputId={id}
      options={options}
      placeholder={placeholder}
      className={`${styles.select} ${disabled ? styles.disabledSelect : null}`}
      onChange={onChange}
      isDisabled={disabled}      
    />
  )
}