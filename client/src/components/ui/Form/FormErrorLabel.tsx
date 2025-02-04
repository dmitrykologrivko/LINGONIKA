type FormLabelProps = {
  className?: string;
  error?: string;
};

function FormErrorLabel({ className, error }: FormLabelProps) {
  if (!error) return null;

  return (
    <label className={`${className ? className : ''} label`}>
      <span className='label-text-alt text-error'>{error}</span>
    </label>
  );
}

export default FormErrorLabel;
