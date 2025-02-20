import { ReactElement } from 'react';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Button,
  ReactHookFormZod,
  FormItem,
  Textarea,
  Select,
  Checkbox,
  Loading,
  ErrorView,
} from '@/components';
import {
  useApiClient,
  useHandleQueryError,
  useHandleMutationError,
  useQueriesState,
} from '@/hooks';
import {
  getLanguagesOptions,
  getCardOptions,
  createCard,
  updateCard,
  CreateCardRequest,
  UpdateCardRequest,
  ValidationError,
  CARDS_QUERY_KEY,
  CREATE_CARD_MUTATION_KEY,
  UPDATE_CARD_MUTATION_KEY,
} from '@/api';

const LANGUAGE_FROM_KEY = 'languageFrom';
const LANGUAGE_TO_KEY = 'languageTo';
const TEXT_FROM_KEY = 'textFrom';
const TEXT_TO_KEY = 'textTo';
const EXAMPLE_KEY = 'example';
const IS_LEARNED_KEY = 'isLearned';

const schema = z.object({
  [LANGUAGE_FROM_KEY]: z.string(),
  [LANGUAGE_TO_KEY]: z.string(),
  [TEXT_FROM_KEY]: z.string().min(1).max(250),
  [TEXT_TO_KEY]: z.string().min(1).max(250),
  [EXAMPLE_KEY]: z.string().max(3000).optional().nullable(),
  [IS_LEARNED_KEY]: z.boolean().optional(),
});

type CardFormData = z.infer<typeof schema>;

const Form = ReactHookFormZod<CardFormData>;

type CardFormModalProps = {
  cardId?: number;
  show: boolean;
  onClose: () => void;
  onSuccessSubmission?: () => void;
  languageFrom?: string;
  languageTo?: string;
  groupId?: number;
};

function CardFormModal({
                         cardId,
                         show,
                         onClose,
                         onSuccessSubmission,
                         languageFrom,
                         languageTo,
                         groupId,
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
    learned: t('learned', { ns: 'cards' }),
    cancel: t('cancel', { ns: 'actions' }),
    create: t('create', { ns: 'actions' }),
    edit: t('edit', { ns: 'actions' }),
  };

  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      {
        ...getLanguagesOptions({}, apiClient),
        enabled: show,
      },
      {
        ...getCardOptions(cardId!, apiClient),
        queryKey: [`${CARDS_QUERY_KEY}_${cardId}`],
        enabled: show && cardId !== undefined
      }
    ],
  });
  const languagesQuery = queries[0];
  const cardQuery = queries[1];
  const queriesState = useQueriesState(queries);
  const errorMessage = useHandleQueryError(queriesState.firstError);

  const createMutation = useMutation({
    mutationFn: (req: CreateCardRequest) => createCard(req, apiClient),
    mutationKey: [CREATE_CARD_MUTATION_KEY],
  });
  const updateMutation = useMutation({
    mutationFn: (req: UpdateCardRequest) => updateCard(req, apiClient),
    mutationKey: [UPDATE_CARD_MUTATION_KEY],
  });
  const handleMutationError = useHandleMutationError();
  const isMutating = createMutation.isPending || updateMutation.isPending;

  const { Dialog } = Modal.useDialog();

  const formProps = {
    errors: (
      (createMutation.error instanceof ValidationError ? createMutation.error.fieldErrors : undefined)
      || (updateMutation.error instanceof ValidationError ? updateMutation.error.fieldErrors : undefined)
    ),
    defaultValues: {
      ...cardQuery.data,
      [LANGUAGE_FROM_KEY]: cardQuery.data?.languageFrom || languageFrom,
      [LANGUAGE_TO_KEY]: cardQuery.data?.languageTo || languageTo,
    }
  };

  const onSubmit = (data: CardFormData) => {
    const onSuccess = () => {
      queryClient.invalidateQueries({ queryKey: [CARDS_QUERY_KEY] });

      if (onSuccessSubmission) onSuccessSubmission();

      onClose();
    };

    if (!cardId) {
      createMutation.mutate({
        textFrom: data.textFrom,
        textTo: data.textTo,
        languageFrom: data.languageFrom,
        languageTo:  data.languageTo,
        example: data.example,
        isLearned: data.isLearned,
        groupId: groupId,
      }, {
        onSuccess,
        onError: handleMutationError,
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
      isLearned: data.isLearned,
    }, {
      onSuccess,
      onError: handleMutationError,
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
        {(queriesState.isLoading) && (
          <div className='flex justify-center items-center gap-2'>
            {translation.preparing}
            <Loading variant='spinner'/>
          </div>
        )}

        {queriesState.isError && (
          <div>
            <ErrorView errorMessage={errorMessage} bordered={false} handleRetry={queriesState.referch}/>
            <div className='flex gap-2 justify-end mt-8'>
              <Button type='button' color='neutral' onClick={onClose}>
                {translation.cancel}
              </Button>
            </div>
          </div>
        )}

        {queriesState.isSuccess && (
          <Form onSubmit={onSubmit} schema={schema} useFormProps={formProps}
                renderForm={({ register, formState: { errors } }) => (
                  <>
                    {(!cardId && !languageFrom) && (
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

                    {(!cardId && !languageTo) && (
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

                    <FormItem inline label={translation.learned} error={errors[IS_LEARNED_KEY]?.message}
                              colLabelWidth='w-2/12' colFieldWidth='w-10/12'
                              renderField={(props) => (
                                <Checkbox {...props} {...register(IS_LEARNED_KEY)} color='primary'/>
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
