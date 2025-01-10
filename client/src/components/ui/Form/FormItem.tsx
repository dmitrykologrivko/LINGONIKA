import { PropsWithChildren, ReactElement } from 'react';

type FormItemProps = {
  label: string;
  error?: string;
  required?: boolean;
  renderField: (props: object) => ReactElement;
};

function FormItem({ renderField, label, error, required }: PropsWithChildren<FormItemProps>) {
  return (
    <div className='form-control w-full'>
      <label className='label'>
        <span className={`label-text ${error ? 'text-error' : ''}`}>{`${label}${required ? ' *' : ''}`}</span>
      </label>
      {renderField && renderField({ color: error ? 'error' : 'neutral' })}
      {error && (
        <label className='label'>
          <span className='label-text-alt text-error'>{error}</span>
        </label>
      )}
    </div>
  );
}

export default FormItem;
