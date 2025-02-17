import { useRef } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Tutor, TutorMode } from '@/features/tutor';
import { useAvailableHeight, usePageTitle } from '@/hooks';

function TutorPage() {
  const { t } = useTranslation();

  const params = useParams();
  const languageFrom = params.languageFrom ? (params.languageFrom as string).toUpperCase() : undefined;
  const languageTo = params.languageTo ? (params.languageTo as string).toUpperCase() : undefined;
  const groupId = params.groupId ? Number(params.groupId) : undefined;

  const [searchParams] = useSearchParams();
  const mode = (searchParams.get('mode') || '').toUpperCase() as TutorMode;

  const containerRef = useRef(null);
  const availableHeight = useAvailableHeight(containerRef);

  usePageTitle(t('heading', { ns: 'tutor' }));

  return (
    <div ref={containerRef} className='p-2 md:p-8 flex flex-col justify-between items-center'
         style={{height: availableHeight}}>
      <Tutor className='w-full md:w-1/2' mode={mode} groupId={groupId}
             languageFrom={languageFrom} languageTo={languageTo}/>
      <a className='text-primary font-bold cursor-pointer mb-4'
         onClick={() => window.history.back()}>
        {t('finishTutorial', { ns: 'tutor' })}
      </a>
    </div>
  );
}

export default TutorPage;
