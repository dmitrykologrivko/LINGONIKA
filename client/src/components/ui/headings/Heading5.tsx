import { PropsWithChildren } from 'react';

type HeadingProps = {
  className?: string;
} & PropsWithChildren;

function Heading5({ children, className }: HeadingProps) {
  return (
    <h5 className={`${className || ''} text-sm font-bold`}>
      {children}
    </h5>
  );
}

export default Heading5;
