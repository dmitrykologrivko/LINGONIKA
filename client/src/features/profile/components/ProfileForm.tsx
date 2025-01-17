import { z } from 'zod';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  ReactHookFormZod,
  FormItem,
  Input,
  Button,
  ProfileSkeleton,
} from '@/components';
import {
  useApiClient,
  useAlertsManager,
  useHandleMutationError,
} from '@/hooks';
import {
  getProfileOptions,
  updateProfile,
  UpdateProfileRequest,
  ValidationError,
} from '@/api';
import { translate } from '@/utils';
import profileIcon from '@/assets/profile-user-black.svg';

const FIRST_NAME_KEY = 'firstName';
const LAST_NAME_KEY = 'lastName';

const schema = z.object({
  [FIRST_NAME_KEY]: z.string()
    .min(2, translate('minLength', { ns: 'errors', what: translate(FIRST_NAME_KEY, { ns: 'fields' }), length: '2' }))
    .max(30, translate('maxLength', { ns: 'errors', what: translate(FIRST_NAME_KEY, { ns: 'fields' }), length: '30' })),
  [LAST_NAME_KEY]: z.string()
    .min(2, translate('minLength', { ns: 'errors', what: translate(LAST_NAME_KEY, { ns: 'fields' }), length: '2' }))
    .max(30, translate('maxLength', { ns: 'errors', what: translate(LAST_NAME_KEY, { ns: 'fields' }), length: '150' })),
});

type ProfileFromData = z.infer<typeof schema>;

const Form = ReactHookFormZod<ProfileFromData>;

type ProfileFormProps = {
  className?: string;
  onSuccessSubmission?: () => void;
};

function ProfileForm({ className, onSuccessSubmission }: ProfileFormProps) {
  const { t } = useTranslation();
  const translation = {
    firstNameLabel: t(FIRST_NAME_KEY, { ns: 'fields' }),
    firstNamePlaceholder: t('firstNamePlaceholder', { ns: 'fields' }),
    lastNameLabel: t(LAST_NAME_KEY, { ns: 'fields' }),
    lastNamePlaceholder: t('lastNamePlaceholder', { ns: 'fields' }),
  };

  const alertsManager = useAlertsManager();

  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const queryOptions = getProfileOptions(apiClient);
  const { isFetching, isFetched, data } = useQuery(queryOptions);
  const mutation = useMutation({
    mutationFn: (req: UpdateProfileRequest) => updateProfile(req, apiClient),
  });
  const handleMutationError = useHandleMutationError();

  const formProps = {
    errors: mutation.error instanceof ValidationError ? mutation.error.fieldErrors : undefined,
    defaultValues: {
      [FIRST_NAME_KEY]: data?.firstName,
      [LAST_NAME_KEY]: data?.lastName,
    }
  };

  const onSubmit = (formData: ProfileFromData) => {
    mutation.mutate({
      ...data!,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
    }, {
      onSuccess: () => {
        alertsManager.addAlert({
          text: t('profileSaved', { ns: 'profile' }),
          status: 'success',
        });

        queryClient.invalidateQueries({
          queryKey: queryOptions.queryKey,
        });

        if (onSuccessSubmission) {
          onSuccessSubmission();
        }
      },
      onError: handleMutationError,
    });
  };

  return (
    <div className={`${className} min-w-80 md:min-w-96`}>
      {isFetching && (
        <ProfileSkeleton/>
      )}

      {isFetched && (
        <>
          <div className='mt-4 mb-4 flex flex-col items-center justify-center gap-2'>
            <img src={profileIcon} alt='Chevron Down Icon' className='w-32 h-32'/>
            {data?.username}
          </div>

          <Form onSubmit={onSubmit} schema={schema} useFormProps={formProps}
                renderForm={({register, formState: {errors}}) => (
                  <>
                  <FormItem label={translation.firstNameLabel} error={errors[FIRST_NAME_KEY]?.message}
                              renderField={(props) => (
                                <Input {...props} {...register(FIRST_NAME_KEY)}
                                       placeholder={translation.firstNamePlaceholder}/>
                              )}/>

                    <FormItem label={translation.lastNameLabel} error={errors[LAST_NAME_KEY]?.message}
                              renderField={(props) => (
                                <Input {...props} {...register(LAST_NAME_KEY)}
                                       placeholder={translation.lastNamePlaceholder}/>
                              )}/>

                    {errors.root && (<div className='mt-4 text-error'>{errors.root?.message}</div>)}

                    <Button className='mt-4' type="submit" color='primary' fullWidth={true} animation={false}
                            disabled={mutation.isPending}>
                      {t('editProfile', {ns: 'profile'})}
                    </Button>
                  </>
                )}/>
        </>
      )}
    </div>
  );
}

export default ProfileForm;
