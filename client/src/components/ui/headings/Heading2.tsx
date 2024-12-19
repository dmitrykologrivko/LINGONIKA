import { PropsWithChildren } from 'react';

function Heading2({ children }: PropsWithChildren) {
  return (
    <h2 className='text-4xl font-bold dark:text-white'>
      {children}
    </h2>
  );
}

export default Heading2;
