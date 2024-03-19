import React from 'react';
import { Children } from 'react';

const Input = ({ type = 'text', name, label, placeholder, register, errors, validations, cellWidth = 10, children }) => {
  return (

    <div className="row">
      <label className={`cell-${16 - cellWidth} label`}>{label}</label>
      <div className={`${errors[name] ? 'has-error' : ''} cell-${cellWidth}`}>
        {children ? Children.only(children) :
          <input
            type={type}
            placeholder={placeholder}
            {...register(name, validations[name])}
          />
        }
        {errors[name] && <div className="hint">{errors[name].message.toString()}</div>}
      </div>
    </div>
  );
}

export default Input;