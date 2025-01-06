import { ReactElement } from 'react';
import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FieldValues
} from 'react-hook-form';

export type ReactHookFormProps<T extends FieldValues> = {
  className?: string;
  onSubmit: (formData: T) => void | Promise<void>;
  useFormProps?: UseFormProps<T>;
  renderForm: (useFormReturn: UseFormReturn<T>) => ReactElement;
};

function ReactHookForm<T extends FieldValues>(
  { className, renderForm, useFormProps, onSubmit }: ReactHookFormProps<T>
) {
  const useFormReturn = useForm<T>(useFormProps);
  return (
    <form className={className} onSubmit={useFormReturn.handleSubmit(onSubmit)}>
      {renderForm && renderForm(useFormReturn)}
    </form>
  );
}

export default ReactHookForm;
