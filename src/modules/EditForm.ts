import { FormEventHandler } from 'react';
import { FieldValues, UseFormReset, UseFormRegister, FieldErrors } from "react-hook-form";

export interface EditFormProps {
  registr: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onReset: UseFormReset<FieldValues>;
}