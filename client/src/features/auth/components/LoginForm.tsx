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
import { useApiClient } from '@/hooks';
import { login, LoginRequest, ValidationError } from '@/api';
import { translate } from '@/utils';

const schema = z.object({
  username: z.string().email(translate('invalidEmail', { ns: 'errors' })),
  password: z.string().min(8, translate('minLength', { ns: 'errors', what: 'Password', length: '8' })),
});

type LoginFromData = z.infer<typeof schema>;

const Form = ReactHookFormZod<LoginFromData>;

const USERNAME_KEY = 'username';
const PASSWORD_KEY = 'password';

type LoginFormProps = {
  onSuccessLogin: () => void;
};

function LoginForm({ onSuccessLogin }: LoginFormProps) {
  const { t } = useTranslation();
  const translation = {
    heading: t('heading', { ns: 'login' }),
    usernameLabel: t(USERNAME_KEY, { ns: 'fields' }),
    usernamePlaceholder: t('usernamePlaceholder', { ns: 'fields' }),
    passwordLabel: t(PASSWORD_KEY, { ns: 'fields' }),
    passwordPlaceholder: t('passwordPlaceholder', { ns: 'fields' }),
  };

  const apiClient = useApiClient();
  const mutation = useMutation({
    mutationFn: (req: LoginRequest) => login(req, apiClient)
  });

  const formProps = {
    errors: mutation.error instanceof ValidationError ? mutation.error.fieldErrors : undefined,
  };

  const onSubmit = (data: LoginFromData) => {
    mutation.mutate(data, {
      onSuccess: onSuccessLogin
    });
  };

  return (
    <div className='min-w-80 md:min-w-96'>
      <LogoBanner/>
      <Heading1 className='text-center'>{translation.heading}</Heading1>

      <Form className='mt-4' onSubmit={onSubmit} schema={schema} useFormProps={formProps}
            renderForm={({ register, formState: { errors } }) => (
              <>
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

                {errors.root && (<div className='mt-4 text-error'>{errors.root?.message}</div>)}

                <Button className='mt-4' type="submit" color='primary' fullWidth={true} animation={false}
                        disabled={mutation.isPending}>
                  {t('signIn')}
                </Button>
              </>
            )}/>
    </div>
  );
}

export default LoginForm;
