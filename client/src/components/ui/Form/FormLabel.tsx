type FormLabelProps = {
  className?: string;
  label: string;
  isValid?: boolean;
  required?: boolean;
};

function FormLabel({ className, label, isValid, required }: FormLabelProps) {
  return (
    <label className={`${className ? className : ''} label`}>
      <span className={`label-text ${!isValid ? 'text-error' : ''}`}>{`${label}${required ? ' *' : ''}`}</span>
    </label>
  );
}

export default FormLabel;
