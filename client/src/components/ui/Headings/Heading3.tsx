import { PropsWithChildren } from 'react';

type HeadingProps = {
  className?: string;
};

function Heading3({ children, className }: PropsWithChildren<HeadingProps>) {
  return (
    <h3 className={`${className || ''} text-xl font-bold`}>
      {children}
    </h3>
  );
}

export default Heading3;
