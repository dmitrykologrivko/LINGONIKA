import { PropsWithChildren } from 'react';

type PanelProps = {
  rounded?: boolean;
  bordered?: boolean;
  shadow?: boolean;
  shadowSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

function Panel(
  { children, rounded, bordered, shadow, shadowSize }: PropsWithChildren<PanelProps>
) {
  const shadows = {
    'xs': 'shadow-xs',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl',
  };
  const additionalClassName = `
    ${rounded ? 'rounded' : ''} ${shadow ? `${shadows[shadowSize || 'sm']}` : ''} ${bordered ? `border` : ''}
  `;

  return (
    <div className={`p-4 bg-white ${additionalClassName}`}>
      {children}
    </div>
  );
}

export default Panel;
