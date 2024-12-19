import { PropsWithChildren } from 'react';

function Heading1({ children }: PropsWithChildren) {
  return (
    <h1 className='text-5xl font-extrabold dark:text-white'>
      {children}
    </h1>
  );
}

export default Heading1;
