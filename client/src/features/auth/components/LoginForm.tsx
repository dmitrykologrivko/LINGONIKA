import { useCallback } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import {
  LogoBanner,
  Heading1,
  ReactHookFormZod,
  FormItem,
  Input,
  Button,
} from '@/components';
import { useAsyncMutation, useApiClient } from '@/hooks';
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

function LoginForm() {
  const apiClient = useApiClient();

  const { t } = useTranslation();
  const translation = {
    usernameLabel: t(USERNAME_KEY, { ns: 'fields' }),
    usernamePlaceholder: t('usernamePlaceholder', { ns: 'fields' }),
    passwordLabel: t(PASSWORD_KEY, { ns: 'fields' }),
    passwordPlaceholder: t('passwordPlaceholder', { ns: 'fields' }),
  };

  const mutationFn = useCallback(
    (req: LoginRequest) => login(req, apiClient),
    [apiClient]
  );
  const mutation = useAsyncMutation(mutationFn);

  const onSubmit = async (formData: LoginFromData) => {
    await mutation.mutate(formData);
  }

  const formProps = {
    defaultValues: { username: 'test@test.com', password: '123456789' },
    errors: mutation.error instanceof ValidationError ? mutation.error.fieldErrors : undefined,
  };

  return (
    <div className=''>
      <LogoBanner/>
      <Heading1>Login Form</Heading1>

      <Form schema={schema} useFormProps={formProps} onSubmit={onSubmit}
            renderForm={({ register, formState: { errors } }) => (
              <>
                <FormItem label={translation.usernameLabel}
                          error={errors[USERNAME_KEY]?.message}
                          renderField={(props) => (
                            <Input {...props} {...register(USERNAME_KEY)}
                                   placeholder={translation.usernamePlaceholder}/>
                          )}/>

                <FormItem label={translation.passwordLabel}
                          error={errors[PASSWORD_KEY]?.message}
                          renderField={(props) => (
                            <Input type='password' {...props} {...register(PASSWORD_KEY)}
                                   placeholder={translation.passwordPlaceholder}/>
                          )}/>

                {errors.root && (<div className='p-4 pl-0 text-error'>{errors.root?.message}</div>)}

                <Button type="submit" fullWidth={true} color='primary' animation={false} disabled={mutation.isLoading}>{t('signIn')}</Button>
              </>
            )}/>
    </div>
  );
}

export default LoginForm;
