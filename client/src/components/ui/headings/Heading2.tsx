import { PropsWithChildren } from 'react';

type HeadingProps = {
  className?: string;
} & PropsWithChildren;

function Heading2({ children, className }: HeadingProps) {
  return (
    <h2 className={`${className || ''} text-2xl font-bold`}>
      {children}
    </h2>
  );
}

export default Heading2;
