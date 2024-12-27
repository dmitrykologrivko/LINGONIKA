import { FieldValues } from 'react-hook-form';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactHookForm, { ReactHookFormProps } from './ReactHookForm';

export type ReactHookFormZodProps<T extends FieldValues> = {
  schema: ZodType<T>;
} & ReactHookFormProps<T>;

function ReactHookFormZod<T extends FieldValues>(props: ReactHookFormZodProps<T>) {
  return (
    <ReactHookForm {...props} useFormProps={{ ...props.useFormProps, resolver: zodResolver(props.schema) }}/>
  );
}

export default ReactHookFormZod;
