import { PropsWithChildren } from 'react';

type HeadingProps = {
  className?: string;
};

function Heading2({ children, className }: PropsWithChildren<HeadingProps>) {
  return (
    <h2 className={`${className || ''} text-2xl font-bold`}>
      {children}
    </h2>
  );
}

export default Heading2;
