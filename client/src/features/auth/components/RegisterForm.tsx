import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  LogoBanner,
  Heading1,
  ReactHookFormZod,
  FormItem,
  Input,
  Button,
} from '@/components';
import { useApiClient, useHandleMutationError } from '@/hooks';
import { register, RegisterRequest, ValidationError } from '@/api';
import { translate } from '@/utils';

const USERNAME_KEY = 'username';
const PASSWORD_KEY = 'password';
const CONFIRM_PASSWORD_KEY = 'confirmPassword';
const FIRST_NAME_KEY = 'firstName';
const LAST_NAME_KEY = 'lastName';

const schema = z.object({
  [USERNAME_KEY]: z.string().email(translate('invalidEmail', { ns: 'errors' })),
  [PASSWORD_KEY]: z.string()
    .min(8, translate('minLength', { ns: 'errors', what: translate(PASSWORD_KEY, { ns: 'fields' }), length: '8' }))
    .max(128, translate('maxLength', { ns: 'errors', what: translate(PASSWORD_KEY, { ns: 'fields' }), length: '128' })),
  [CONFIRM_PASSWORD_KEY]: z.string(),
  [FIRST_NAME_KEY]: z.string()
    .min(2, translate('minLength', { ns: 'errors', what: translate(FIRST_NAME_KEY, { ns: 'fields' }), length: '2' }))
    .max(30, translate('maxLength', { ns: 'errors', what: translate(FIRST_NAME_KEY, { ns: 'fields' }), length: '30' })),
  [LAST_NAME_KEY]: z.string()
    .min(2, translate('minLength', { ns: 'errors', what: translate(LAST_NAME_KEY, { ns: 'fields' }), length: '2' }))
    .max(30, translate('maxLength', { ns: 'errors', what: translate(LAST_NAME_KEY, { ns: 'fields' }), length: '150' })),
}).refine((data) => data.password === data.confirmPassword, {
  path: [CONFIRM_PASSWORD_KEY],
  message: translate('passwordsMatch', { ns: 'errors' }),
});

type RegisterFromData = z.infer<typeof schema>;

const Form = ReactHookFormZod<RegisterFromData>;

type RegisterFormProps = {
  className?: string;
  onSuccessRegistration: () => void;
};

function RegisterForm({ className, onSuccessRegistration }: RegisterFormProps) {
  const { t } = useTranslation();
  const translation = {
    heading: t('heading', { ns: 'register' }),
    usernameLabel: t(USERNAME_KEY, { ns: 'fields' }),
    usernamePlaceholder: t('usernamePlaceholder', { ns: 'fields' }),
    passwordLabel: t(PASSWORD_KEY, { ns: 'fields' }),
    passwordPlaceholder: t('passwordPlaceholder', { ns: 'fields' }),
    confirmPasswordLabel: t(CONFIRM_PASSWORD_KEY, { ns: 'fields' }),
    confirmPasswordPlaceholder: t('confirmPasswordPlaceholder', { ns: 'fields' }),
    firstNameLabel: t(FIRST_NAME_KEY, { ns: 'fields' }),
    firstNamePlaceholder: t('firstNamePlaceholder', { ns: 'fields' }),
    lastNameLabel: t(LAST_NAME_KEY, { ns: 'fields' }),
    lastNamePlaceholder: t('lastNamePlaceholder', { ns: 'fields' }),
  };

  const apiClient = useApiClient();
  const mutation = useMutation({
    mutationFn: (req: RegisterRequest) => register(req, apiClient)
  });
  const handleMutationError = useHandleMutationError();

  const formProps = {
    errors: mutation.error instanceof ValidationError ? mutation.error.fieldErrors : undefined,
  };

  const onSubmit = (data: RegisterFromData) => {
    mutation.mutate({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    }, {
      onSuccess: onSuccessRegistration,
      onError: handleMutationError,
    });
  };

  return (
    <div className={className}>
      <LogoBanner/>
      <Heading1 className='text-center'>{translation.heading}</Heading1>

      <Form className='mt-4' onSubmit={onSubmit} schema={schema} useFormProps={formProps}
            renderForm={({ register, formState: { errors } }) => (
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

                <FormItem label={translation.usernameLabel} error={errors[USERNAME_KEY]?.message}
                          renderField={(props) => (
                            <Input {...props} {...register(USERNAME_KEY)}
                                   placeholder={translation.usernamePlaceholder}/>
                          )}/>

                <FormItem label={translation.passwordLabel} error={errors[PASSWORD_KEY]?.message}
                          renderField={(props) => (
                            <Input type='password' {...props} {...register(PASSWORD_KEY)}
                                   placeholder={translation.passwordPlaceholder}/>
                          )}/>

                <FormItem label={translation.confirmPasswordLabel} error={errors[CONFIRM_PASSWORD_KEY]?.message}
                          renderField={(props) => (
                            <Input type='password' {...props} {...register(CONFIRM_PASSWORD_KEY)}
                                   placeholder={translation.confirmPasswordPlaceholder}/>
                          )}/>

                {errors.root && (<div className='mt-4 text-error'>{errors.root?.message}</div>)}

                <Button className='mt-4' type="submit" color='primary' fullWidth={true} animation={false}
                        disabled={mutation.isPending}>
                  {t('signIn', { ns: 'actions' })}
                </Button>
              </>
            )}/>
    </div>
  );
}

export default RegisterForm;
