import { PropsWithChildren } from 'react';

type HeadingProps = {
  className?: string;
};

function Heading1({ children, className }: PropsWithChildren<HeadingProps>) {
  return (
    <h1 className={`${className || ''} text-3xl font-extrabold`}>
      {children}
    </h1>
  );
}

export default Heading1;
