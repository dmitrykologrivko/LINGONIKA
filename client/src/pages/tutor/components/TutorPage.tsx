import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Tutor } from '@/features/tutor';
import { usePageTitle } from '@/hooks';

function TutorPage() {
  const { t } = useTranslation();

  const params = useParams();
  const languageFrom = params.languageFrom ? (params.languageFrom as string).toUpperCase() : undefined;
  const languageTo = params.languageTo ? (params.languageTo as string).toUpperCase() : undefined;
  const groupId = params.groupId ? Number(params.groupId) : undefined;

  usePageTitle(t('heading', { ns: 'tutor' }));

  return (
    <div className='p-2 md:p-4 flex flex-col justify-center items-center gap-12'>
      <Tutor className='w-full md:w-1/2' groupId={groupId}
             languageFrom={languageFrom} languageTo={languageTo}/>
      <a className='text-primary font-bold cursor-pointer'
         onClick={() => window.history.back()}>
        {t('finishTutorial', { ns: 'tutor' })}
      </a>
    </div>
  );
}

export default TutorPage;
