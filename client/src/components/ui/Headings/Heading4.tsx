import { PropsWithChildren } from 'react';

type HeadingProps = {
  className?: string;
};

function Heading4({ children, className }: PropsWithChildren<HeadingProps>) {
  return (
    <h4 className={`${className || ''} text-lg font-bold`}>
      {children}
    </h4>
  );
}

export default Heading4;
