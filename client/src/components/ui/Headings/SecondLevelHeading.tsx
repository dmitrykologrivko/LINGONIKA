import { PropsWithChildren } from 'react';

function DefaultHeading({ children }: PropsWithChildren) {
  return (
    <h2 className='text-4xl font-extrabold dark:text-white'>
      {children}
    </h2>
  );
}

export default DefaultHeading;
