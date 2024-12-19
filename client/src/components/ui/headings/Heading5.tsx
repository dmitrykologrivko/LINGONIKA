import { PropsWithChildren } from 'react';

function Heading5({ children }: PropsWithChildren) {
  return (
    <h5 className='text-xl font-bold dark:text-white'>
      {children}
    </h5>
  );
}

export default Heading5;
