import { PropsWithChildren } from 'react';

type HeadingProps = {
  className?: string;
};

function Heading6({ children, className }: PropsWithChildren<HeadingProps>) {
  return (
    <h6 className={`${className || ''} text-xs font-bold`}>
      {children}
    </h6>
  );
}

export default Heading6;
