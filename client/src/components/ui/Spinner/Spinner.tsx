import { createPortal } from 'react-dom';

type SpinnerProps = {
  show: boolean;
};

function Spinner({ show }: SpinnerProps) {
  return (
    createPortal(
      <div className={`w-full h-full absolute justify-center items-center bg-white/75 z-[1001] ${show ? 'flex' : 'hidden'}`}>
        <div className='w-fit font-bold font-mono text-[30px] text-transparent spinner-mixin'>
          Загрузка...
        </div>
      </div>,
      document.getElementById('root')!
    )
  );
}

export default Spinner;
