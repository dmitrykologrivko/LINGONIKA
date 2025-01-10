import { ReactElement } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Button,
  ReactHookFormZod,
  FormItem,
  Textarea,
  Select,
  Loading,
} from '@/components';
import { useApiClient } from '@/hooks';
import {
  getLanguagesOptions,
  getCardOptions,
  createCard,
  updateCard,
  CreateCardRequest,
  UpdateCardRequest,
  ValidationError,
} from '@/api';
import { any, all } from '@/utils';

const LANGUAGE_FROM_KEY = 'languageFrom';
const LANGUAGE_TO_KEY = 'languageTo';
const TEXT_FROM_KEY = 'textFrom';
const TEXT_TO_KEY = 'textTo';
const EXAMPLE_KEY = 'example';

const schema = z.object({
  [LANGUAGE_FROM_KEY]: z.string(),
  [LANGUAGE_TO_KEY]: z.string(),
  [TEXT_FROM_KEY]: z.string().min(1).max(250),
  [TEXT_TO_KEY]: z.string().min(1).max(250),
  [EXAMPLE_KEY]: z.string().max(3000).optional(),
});

type CardFormData = z.infer<typeof schema>;

const Form = ReactHookFormZod<CardFormData>;

type CardFormModalProps = {
  cardId?: number;
  show: boolean;
  onClose: () => void;
  onSuccessSubmission: () => void;
  languageFrom?: string;
  languageTo?: string;
};

function CardFormModal({
                         cardId,
                         show,
                         onClose,
                         onSuccessSubmission,
                         languageFrom,
                         languageTo,
                       }: CardFormModalProps
) {
  const { t } = useTranslation();
  const translation = {
    createCardTitle: t('createCardTitle', { ns: 'cards' }),
    editCardTitle: t('editCardTitle', { ns: 'cards' }),
    preparing: t('preparing', { ns: 'labels' }),
    languageFrom: t('languageFrom', { ns: 'fields' }),
    languageFromDefault: t('languageFromDefault', { ns: 'fields' }),
    languageTo: t('languageTo', { ns: 'fields' }),
    languageToDefault: t('languageToDefault', { ns: 'fields' }),
    textFrom: t('textFrom', { ns: 'cards' }),
    textFromPlaceholder: t('textFromPlaceholder', { ns: 'cards' }),
    textTo: t('textTo', { ns: 'cards' }),
    textToPlaceholder: t('textToPlaceholder', { ns: 'cards' }),
    example: t('example', { ns: 'cards' }),
    examplePlaceholder: t('examplePlaceholder', { ns: 'cards' }),
    cancel: t('cancel', { ns: 'actions' }),
    create: t('create', { ns: 'actions' }),
    edit: t('edit', { ns: 'actions' }),
  };

  const apiClient = useApiClient();
  const languagesQuery = useQuery({
    ...getLanguagesOptions({}, apiClient),
    enabled: show,
  });
  const cardQuery = useQuery({
    ...getCardOptions(cardId!, apiClient),
    enabled: show && cardId !== undefined
  });
  const createMutation = useMutation({
    mutationFn: (req: CreateCardRequest) => createCard(req, apiClient),
  });
  const updateMutation = useMutation({
    mutationFn: (req: UpdateCardRequest) => updateCard(req, apiClient),
  });
  const isFetching = any(languagesQuery.isFetching, cardQuery.isFetching);
  const isFetched = cardId ? all(languagesQuery.isFetched, cardQuery.isFetched) : languagesQuery.isFetched;
  const isMutating = createMutation.isPending || updateMutation.isPending;

  const { Dialog } = Modal.useDialog();

  const formProps = {
    errors: (
      (createMutation.error instanceof ValidationError ? createMutation.error.fieldErrors : undefined)
      || (updateMutation.error instanceof ValidationError ? updateMutation.error.fieldErrors : undefined)
    ),
    defaultValues: {
      [LANGUAGE_FROM_KEY]: cardQuery.data?.languageFrom || languageFrom,
      [LANGUAGE_TO_KEY]: cardQuery.data?.languageTo || languageTo,
      [TEXT_FROM_KEY]: cardQuery.data?.textFrom,
      [TEXT_TO_KEY]: cardQuery.data?.textTo,
      [EXAMPLE_KEY]: cardQuery.data?.example,
    }
  };

  const onSubmit = (data: CardFormData) => {
    if (!cardId) {
      createMutation.mutate({
        textFrom: data.textFrom,
        textTo: data.textTo,
        languageFrom: data.languageFrom,
        languageTo:  data.languageTo,
        example: data.example,
        isLearned: false
      }, {
        onSuccess: onSuccessSubmission,
      });
      return;
    }

    updateMutation.mutate({
      ...cardQuery.data!,
      textFrom: data.textFrom,
      textTo: data.textTo,
      languageFrom: data.languageFrom,
      languageTo:  data.languageTo,
      example: data.example,
    }, {
      onSuccess: onSuccessSubmission
    });
  };

  return (
    <Dialog open={show} responsive={true}>
      <Modal.Header>
        <span className="font-bold block">{cardId ? translation.editCardTitle : translation.createCardTitle}</span>
        {cardQuery.data && (
          <span className='text-sm'>
            {`${t(cardQuery.data.languageFrom, {ns: 'labels'})} - ${t(cardQuery.data.languageTo, {ns: 'labels'})}`}
          </span>
        )}
      </Modal.Header>

      <Modal.Body>
        {isFetching && (
          <div className='flex justify-center items-center gap-2'>
            {translation.preparing}
            <Loading variant='spinner'/>
          </div>
        )}

        {isFetched && (
          <Form onSubmit={onSubmit} schema={schema} useFormProps={formProps}
                renderForm={({ register, formState: { errors } }) => (
                  <>
                    {!cardId && (
                      <FormItem label={translation.languageFrom} required error={errors[LANGUAGE_FROM_KEY]?.message}
                                renderField={(props) => (
                                  <Select {...props} {...register(LANGUAGE_FROM_KEY)}>
                                    <Select.Option value={'default'} disabled>
                                      {translation.languageFromDefault}
                                    </Select.Option>

                                    {languagesQuery.data?.map(((language, index) => (
                                      <Select.Option key={index} value={language.code}>
                                        {t(language.code, { ns: 'labels' })}
                                      </Select.Option>
                                    ))) as ReactElement[]}
                                  </Select>
                                )}/>
                    )}

                    <FormItem label={translation.textFrom} required error={errors[TEXT_FROM_KEY]?.message}
                              renderField={(props) => (
                                <Textarea {...props} {...register(TEXT_FROM_KEY)}
                                          placeholder={translation.textFromPlaceholder}/>
                              )}/>

                    {!cardId && (
                      <FormItem label={translation.languageTo} required error={errors[LANGUAGE_TO_KEY]?.message}
                                renderField={(props) => (
                                  <Select {...props} {...register(LANGUAGE_TO_KEY)}>
                                    <Select.Option value={'default'} disabled>
                                      {translation.languageToDefault}
                                    </Select.Option>

                                    {languagesQuery.data?.map(((language, index) => (
                                      <Select.Option key={index} value={language.code}>
                                        {t(language.code, { ns: 'labels' })}
                                      </Select.Option>
                                    ))) as ReactElement[]}
                                  </Select>
                                )}/>
                    )}

                    <FormItem label={translation.textTo} required error={errors[TEXT_TO_KEY]?.message}
                              renderField={(props) => (
                                <Textarea {...props} {...register(TEXT_TO_KEY)}
                                          placeholder={translation.textToPlaceholder}/>
                              )}/>

                    <FormItem label={translation.example} error={errors[EXAMPLE_KEY]?.message}
                              renderField={(props) => (
                                <Textarea {...props} {...register(EXAMPLE_KEY)}
                                          placeholder={translation.examplePlaceholder}/>
                              )}/>

                    <div className='flex gap-2 justify-end mt-8'>
                      <Button type='button' color='neutral' onClick={onClose}>
                        {translation.cancel}
                      </Button>
                      <Button type='submit' color='primary' animation={false} disabled={isMutating}>
                        {cardId ? translation.edit : translation.create}
                      </Button>
                    </div>
                  </>
                )} />
        )}
      </Modal.Body>
    </Dialog>
  );
}

export default CardFormModal;
