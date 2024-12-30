import { PropsWithChildren } from 'react';

type HeadingProps = {
  className?: string;
} & PropsWithChildren;

function Heading4({ children, className }: HeadingProps) {
  return (
    <h4 className={`${className || ''} text-lg font-bold`}>
      {children}
    </h4>
  );
}

export default Heading4;
