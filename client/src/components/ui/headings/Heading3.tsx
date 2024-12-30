import { PropsWithChildren } from 'react';

type HeadingProps = {
  className?: string;
} & PropsWithChildren;

function Heading3({ children, className }: HeadingProps) {
  return (
    <h3 className={`${className || ''} text-xl font-bold`}>
      {children}
    </h3>
  );
}

export default Heading3;
