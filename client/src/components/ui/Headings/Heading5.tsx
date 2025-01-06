import { PropsWithChildren } from 'react';

type HeadingProps = {
  className?: string;
};

function Heading5({ children, className }: PropsWithChildren<HeadingProps>) {
  return (
    <h5 className={`${className || ''} text-sm font-bold`}>
      {children}
    </h5>
  );
}

export default Heading5;
