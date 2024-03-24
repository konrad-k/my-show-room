import React from 'react';
import { Children } from 'react';

interface InputParams {
  type?: string,
  name: string,
  label: string,
  placeholder?: string,
  options?: { value: string, label: string }[],
  register: any,
  errors: any,
  validations: any,
  cellWidth?: number,
  children?: any,
  readonly: boolean
}

const Input = ({ type = 'text', name, label, placeholder, options, register, errors, validations, cellWidth = 10, children, readonly = false }: InputParams) => {
  const returnType = () => {
    switch (type) {
      case 'textarea':
        return <textarea
          placeholder={placeholder}
          readOnly={readonly}
          {...register(name, validations[name])}
        />
      case 'select':
        return <select
          placeholder={placeholder}
          readOnly={readonly}
          {...register(name, validations[name])}
        >
          {options && options.map(option => <option value={option.value}>{option.label}</option>)}
        </select>

      case 'datetime-local':
        return <input
          type={type}
          readOnly={readonly}
          placeholder={placeholder}
          {...register(name, { ...validations[name], setValueAs: v => new Date(v).toLocaleString() })}
        />

      default:
        return <input
          type={type}
          readOnly={readonly}
          placeholder={placeholder}
          {...register(name, validations[name])}
        />
    }
  }

  return (

    <div className="row">
      <label className={`cell-${16 - cellWidth} label`}>{label}</label>
      <div className={`${errors[name] ? 'has-error' : ''} cell-${cellWidth}`}>
        {children ? Children.only(children) : (returnType())}
        {errors[name] && <div className="hint">{errors[name].message.toString()}</div>}
      </div>
    </div>
  );
}

export default Input;