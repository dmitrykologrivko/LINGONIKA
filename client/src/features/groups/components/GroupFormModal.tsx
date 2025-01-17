import { useQuery, useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Button,
  ReactHookFormZod,
  FormItem,
  Textarea,
  Loading,
} from '@/components';
import { useApiClient, useHandleMutationError } from '@/hooks';
import {
  getGroupOptions,
  createGroup,
  updateGroup,
  CreateGroupRequest,
  UpdateGroupRequest,
  ValidationError,
} from '@/api';

const NAME_KEY = 'name';

const schema = z.object({
  [NAME_KEY]: z.string().min(1).max(50),
});

type GroupFormData = z.infer<typeof schema>;

const Form = ReactHookFormZod<GroupFormData>;

type GroupFormModalProps = {
  groupId?: number;
  show: boolean;
  onClose: () => void;
  onSuccessSubmission: () => void;
  languageFrom?: string;
  languageTo?: string;
};

function GroupFormModal({ groupId,
                          show,
                          onClose,
                          onSuccessSubmission,
                          languageFrom,
                          languageTo }: GroupFormModalProps) {
  const { t } = useTranslation();
  const translation = {
    createGroupTitle: t('createGroupTitle', { ns: 'groups' }),
    editGroupTitle: t('editGroupTitle', { ns: 'groups' }),
    name: t('name', { ns: 'groups' }),
    namePlaceholder: t('namePlaceholder', { ns: 'groups' }),
    preparing: t('preparing', { ns: 'labels' }),
    cancel: t('cancel', { ns: 'actions' }),
    create: t('create', { ns: 'actions' }),
    edit: t('edit', { ns: 'actions' }),
  };

  const apiClient = useApiClient();
  const groupQuery = useQuery({
    ...getGroupOptions(groupId!, apiClient),
    enabled: show && groupId !== undefined
  });
  const createMutation = useMutation({
    mutationFn: (req: CreateGroupRequest) => createGroup(req, apiClient),
  });
  const updateMutation = useMutation({
    mutationFn: (req: UpdateGroupRequest) => updateGroup(req, apiClient),
  });
  const handleMutationError = useHandleMutationError();
  const isFetching = groupId ? groupQuery.isFetching : false;
  const isFetched = groupId ? groupQuery.isFetched : true;
  const isMutating = createMutation.isPending || updateMutation.isPending;

  const { Dialog } = Modal.useDialog();

  const formProps = {
    errors: (
      (createMutation.error instanceof ValidationError ? createMutation.error.fieldErrors : undefined)
      || (updateMutation.error instanceof ValidationError ? updateMutation.error.fieldErrors : undefined)
    ),
    defaultValues: {
      [NAME_KEY]: groupQuery.data?.name
    }
  };

  const onSubmit = (data: GroupFormData) => {
    if (!groupId) {
      createMutation.mutate({
        name: data.name,
        languageFrom: languageFrom!,
        languageTo: languageTo!,
      }, {
        onSuccess: onSuccessSubmission,
        onError: handleMutationError,
      });
      return;
    }

    updateMutation.mutate({
      ...groupQuery.data!,
      name: data.name,
    }, {
      onSuccess: onSuccessSubmission,
      onError: handleMutationError,
    });
  };

  return (
    <Dialog open={show} responsive={true}>
      <Modal.Header>
        <span className="font-bold block">{groupId ? translation.editGroupTitle : translation.createGroupTitle}</span>
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
                    <FormItem label={translation.name} required error={errors[NAME_KEY]?.message}
                              renderField={(props) => (
                                <Textarea {...props} {...register(NAME_KEY)}
                                          placeholder={translation.namePlaceholder}/>
                              )}/>

                    <div className='flex gap-2 justify-end mt-8'>
                      <Button type='button' color='neutral' onClick={onClose}>
                        {translation.cancel}
                      </Button>
                      <Button type='submit' color='primary' animation={false} disabled={isMutating}>
                        {groupId ? translation.edit : translation.create}
                      </Button>
                    </div>
                  </>
                )}/>
        )}
      </Modal.Body>
    </Dialog>
  );
}

export default GroupFormModal;
