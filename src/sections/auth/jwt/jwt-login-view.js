import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// import { Snackbar, Alert } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import axios, { endpoints } from 'src/utils/axios';

// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

//  by google
import { useGoogleLogin } from '@react-oauth/google';
import { useCookies } from 'react-cookie';
// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();
  const [cookies, setCookie] = useCookies(['token']);

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Email or phone is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const validateIfEmailAndPhone = (email_phone) => {
    // email => 0, phone => 1, failed => -1
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const phoneRegex = /^\d{10}$/;
    if (!emailRegex.test(email_phone) && !phoneRegex.test(email_phone)) {
      return -1;
    }
    if (emailRegex.test(email_phone)) {
      return 0;
    }
    return 1;
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const email_phone = data['username'];
      const password = data['password'];
      const type = validateIfEmailAndPhone(email_phone);
      console.log(type);
      if (type == -1) {
        // show error string
        // toast('Invalid Input');
        toast.error('Invalid Input');
      } else {
        // console.log(type);
        const response = await axios.post(endpoints.auth.login, {
          email: email_phone,
          password: password,
          type: type == 0 ? 'email' : 'phone',
        });
        const res_data = response.data;
        if (res_data['token'] == undefined) {
          toast.error(res_data['msg']);
        } else {
          setCookie('token', res_data['token']);
          toast.success('Login Succcessful!');
          document.location.href = '/';
        }
      }
    } catch (error) {
      console.log(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const loginByGoogle = useGoogleLogin({
    onSuccess: async (tokenResonse) => {
      let access_token = tokenResonse;
      console.log(access_token);
      let response = await axios.post(endpoints.auth.loginByGoogle, {
        tokenId: access_token,
      });
      const res_data = response.data;
      if (res_data['msg'] === 'success') {
        toast.success('Login Successful');
        setCookie('token', res_data['token']);
        document.location.href = '/';
      } else {
        toast.error(response['msg']);
      }
    },
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="username" label="Email or Phone" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="button"
        variant="contained"
        onClick={loginByGoogle}
      >
        Continue with Google
      </LoadingButton>
      <LoadingButton fullWidth color="secondary" size="large" type="button" variant="contained">
        Continue with Facebook
      </LoadingButton>

      <Link href={paths.auth.jwt.register} component={RouterLink} variant="subtitle2">
        Not Registed?
      </Link>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
