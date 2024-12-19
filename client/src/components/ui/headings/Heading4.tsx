import { PropsWithChildren } from 'react';

function Heading4({ children }: PropsWithChildren) {
  return (
    <h4 className='text-2xl font-bold dark:text-white'>
      {children}
    </h4>
  );
}

export default Heading4;
