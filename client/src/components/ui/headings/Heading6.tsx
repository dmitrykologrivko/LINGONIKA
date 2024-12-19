import { PropsWithChildren } from 'react';

function Heading6({ children }: PropsWithChildren) {
  return (
    <h6 className='text-lg font-bold dark:text-white'>
      {children}
    </h6>
  );
}

export default Heading6;
