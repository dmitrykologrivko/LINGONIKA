import { createPortal } from 'react-dom';
import { Loading } from 'react-daisyui';

type SpinnerProps = {
  show: boolean;
};

function LoadingOverlay({ show }: SpinnerProps) {
  return (
    createPortal(
      <div className={`w-full h-full absolute justify-center items-center bg-white/75 z-[1001] ${show ? 'flex' : 'hidden'}`}>
        <Loading variant='dots' size='lg' color='primary'/>
      </div>,
      document.getElementById('root')!
    )
  );
}

export default LoadingOverlay;
