import { useRef } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Tutor } from '@/features/tutor';
import { usePageTitle, useAvailableHeight } from '@/hooks';

function TutorPage() {
  const { t } = useTranslation();

  const params = useParams();
  const languageFrom = params.languageFrom ? (params.languageFrom as string).toUpperCase() : undefined;
  const languageTo = params.languageTo ? (params.languageTo as string).toUpperCase() : undefined;
  const groupId = params.groupId ? Number(params.groupId) : undefined;

  const containerRef = useRef(null);
  const availableHeight = useAvailableHeight(containerRef);

  usePageTitle(t('heading', { ns: 'tutor' }));

  return (
    <div ref={containerRef} className='p-2 md:p-8 flex flex-col justify-between items-center'
         style={{height: availableHeight}}>
      <Tutor className='w-full md:w-1/2' groupId={groupId}
             languageFrom={languageFrom} languageTo={languageTo}/>
      <a className='text-primary font-bold cursor-pointer mb-4'
         onClick={() => window.history.back()}>
        {t('finishTutorial', { ns: 'tutor' })}
      </a>
    </div>
  );
}

export default TutorPage;
