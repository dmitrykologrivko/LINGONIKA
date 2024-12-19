import { PropsWithChildren } from 'react';

function Heading3({ children }: PropsWithChildren) {
  return (
    <h3 className='text-3xl font-bold dark:text-white'>
      {children}
    </h3>
  );
}

export default Heading3;
