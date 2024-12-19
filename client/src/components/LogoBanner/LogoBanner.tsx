import logo from '@/assets/logo-primary.svg';

function LogoBanner() {
  return (
    <div className='flex items-center gap-2 p-4'>
      <img src={logo} alt='logo' className='w-20 h-20'/>
      <span className='text-primary font-bold uppercase'>Lingonika</span>
    </div>
  );
}

export default LogoBanner;
