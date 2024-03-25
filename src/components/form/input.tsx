import React from 'react';
import { Children } from 'react';

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

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
  readonly?: boolean
  disabled?: boolean
}

const Input = ({ type = 'text', name, label, placeholder, options, register, errors, validations, cellWidth = 10, children, readonly = false, disabled = false }: InputParams) => {
  const inputCommonProps = { id: name, placeholder, readOnly: readonly, disabled: disabled };
  const returnType = () => {
    switch (type) {
      case 'textarea':
        return <textarea
          {...inputCommonProps}
          {...register(name, validations[name])}
        />
      case 'select':
        return <select
          {...inputCommonProps}
          {...register(name, validations[name])}
        >
          {options && options.map(option => <option value={option.value}>{option.label}</option>)}
        </select>

      case 'datetime-local':
        return <input
          type={type}
          {...inputCommonProps}
          {...register(name, { ...validations[name], setValueAs: v => new Date(v).toLocaleString() })}
        />

      default:
        return <input
          type={type}
          {...inputCommonProps}
          {...register(name, validations[name])}
        />
    }
  }

  const errorProps = errors[name] ? { ariaInvalid: 'true', ariaErrorMessage: `error${name.capitalize()}` } : null;

  return (
    <div className="row">
      <label className={`cell-${16 - cellWidth} label`} htmlFor={name}>{label}</label>
      <div className={`${errors[name] ? 'has-error' : ''} cell-${cellWidth}`} {...errorProps}>
        {children ? Children.only(children) : (returnType())}
        {errors[name] && <div className="hint" id={`error${name.capitalize()}`}>{errors[name].message.toString()}</div>}
      </div>
    </div>
  );
}

export default Input;