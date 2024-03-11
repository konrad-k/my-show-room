import { FormEventHandler } from 'react';
import { FieldValues, UseFormReset, UseFormUnregister, UseFormRegister, FieldErrors, UseFormSetValue, Control, UseFormWatch } from "react-hook-form";

export interface EditFormProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onReset: UseFormReset<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  control?: Control<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  unregister?: UseFormUnregister<FieldValues>;
}