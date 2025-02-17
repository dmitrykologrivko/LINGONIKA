import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Radio, Button } from '@/components';
import { TutorMode } from '../tutor-mode.enum';
import bookIcon from '@/assets/book-bookmark-minimalistic-black.svg';

type TutorBannerProps = {
  languageFrom: string;
  languageTo: string;
  renderLink: (mode: TutorMode) => ReactElement;
};

function TutorBanner({ languageFrom, languageTo, renderLink }: TutorBannerProps) {
  const [mode, setMode] = useState<TutorMode>(TutorMode.WORD_TRANSLATION);

  const { t } = useTranslation();

  return (
    <Card className='bg-white'>
      <Card.Body className='flex flex-col items-center'>
        <img className='w-12 h-12 inline-block' src={bookIcon} alt='Book Icon'/>
        <span className='text-2xl'>{t('learnCards', { ns: 'tutor' })}</span>

        <label className='flex items-center gap-2 cursor-pointer'
               onClick={() => setMode(TutorMode.WORD_TRANSLATION)}>
          <Radio color='primary' size='xs' readOnly
                 checked={mode === TutorMode.WORD_TRANSLATION}/>
          {`${t('wordTranslation', { ns: 'tutor' })} (${languageFrom}-${languageTo})`}
        </label>

        <label className='flex items-center gap-2 cursor-pointer'
               onClick={() => setMode(TutorMode.TRANSLATION_WORD)}>
          <Radio color='primary' size='xs' readOnly
                 checked={mode === TutorMode.TRANSLATION_WORD}/>
          {`${t('translationWord', { ns: 'tutor' })} (${languageTo}-${languageFrom})`}
        </label>

        <Button className='mt-4' color='primary' size='md' wide>
          {renderLink && renderLink(mode)}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TutorBanner;
