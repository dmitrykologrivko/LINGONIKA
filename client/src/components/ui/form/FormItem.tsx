import { PropsWithChildren, ReactElement } from 'react';

type FormItemProps = {
  label: string;
  error?: string;
  renderField: (props: object) => ReactElement;
} & PropsWithChildren;

function FormItem({ renderField, label, error }: FormItemProps) {
  return (
    <div className='form-control w-full'>
      <label className='label'>
        <span className={`label-text ${error ? 'text-error' : ''}`}>{label}</span>
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
