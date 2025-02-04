import { PropsWithChildren, ReactElement } from 'react';
import FormLabel from './FormLabel';
import FormErrorLabel from './FormErrorLabel';
import './FormItem.css';

type ColWidth = 'w-1/12' | 'w-2/12' | 'w-3/12' | 'w-4/12' | 'w-5/12' | 'w-6/12'
  | 'w-7/12' | 'w-8/12' | 'w-9/12' | 'w-10/12' | 'w-11/12' | 'w-12/12';

type FormItemProps = {
  label: string;
  error?: string;
  required?: boolean;
  renderField: (props: object) => ReactElement;
  inline?: boolean;
  colLabelWidth?: ColWidth;
  colFieldWidth?: ColWidth;
};

function FormItem({
                    renderField,
                    label,
                    error,
                    required,
                    inline,
                    colLabelWidth,
                    colFieldWidth
                  }: PropsWithChildren<FormItemProps>) {
  const field = renderField({
    color: error ? 'error' : 'neutral',
    className: 'input-w-full'
  });

  if (inline) {
    return (
      <div className='form-control form-control-inline'>
        <div className={`col-label ${colLabelWidth ? colLabelWidth : 'w-4/12'}`}>
          <FormLabel label={label} required={required} isValid={!error}/>
        </div>
        <div className={`col-field ${colFieldWidth ? colFieldWidth : 'w-8/12'}`}>
          {field}
          <FormErrorLabel className='label-error' error={error}/>
        </div>
      </div>
    );
  }

  return (
    <div className='form-control w-full'>
      <FormLabel label={label} required={required} isValid={!error}/>
      {field}
      <FormErrorLabel error={error}/>
    </div>
  );
}

export default FormItem;
