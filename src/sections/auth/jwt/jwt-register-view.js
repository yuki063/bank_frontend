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
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';
// assets
import { EmailInboxIcon } from 'src/assets/icons';

import axios, { endpoints } from 'src/utils/axios';
import { ClassicVerifyView } from 'src/sections/auth-demo/classic';
// Importing toastify module
import { toast } from 'react-toastify';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
// SignUp by google
import { useGoogleLogin } from '@react-oauth/google';
// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [code, setCode] = useState('');
  const password = useBoolean();
  const [pageIndex, setPageIndex] = useState(0);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email or phone is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    code: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
      const first_name = data['firstName'];
      const last_name = data['lastName'];
      const email_phone = data['email'];
      const password = data['password'];
      setfirstName(first_name);
      setlastName(last_name);
      setEmail(email_phone);
      setPass(password);
      const type = validateIfEmailAndPhone(email_phone);
      // console.log(type);
      if (type == -1) {
        // show error string
        toast('Invalid Input');
      } else {
        console.log(type);
        setPageIndex(1);
        const response = await axios.post(endpoints.auth.register, {
          // firstName: first_name,
          // lastName: last_name,
          email: email_phone,
          // password: password,
          type: type == 0 ? 'email' : 'phone',
        });
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const registerByGoogle = useGoogleLogin({
    onSuccess: async (tokenResonse) => {
      let access_token = tokenResonse;
      console.log(access_token);
      let response = await axios.post(endpoints.auth.registerByGoogle, {
        tokenId: access_token,
      });
      const res_data = response.data;

      if (res_data.msg === 'success') {
        toast.success('Successed Create Accout!');
      } else {
        console.log(res_data);
        toast.error(res_data['msg']);
      }
    },
    onError: async (errorResponse) => {
      console.log(errorResponse);
    },
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 3, position: 'relative' }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>
        <RHFTextField name="email" label="Email or Phone" />
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
          Create account
        </LoadingButton>
        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="button"
          variant="contained"
          onClick={registerByGoogle}
        >
          Continue with Google
        </LoadingButton>
        <LoadingButton fullWidth color="secondary" size="large" type="button" variant="contained">
          Continue with Facebook
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  //--------------------------------------Verify View --------------------------------------------//

  return (
    <div>
      {pageIndex == 0 ? (
        <>
          {renderHead}

          {renderForm}

          {renderTerms}
        </>
      ) : (
        <ClassicVerifyView
          email={email}
          password={pass}
          firstName={firstName}
          lastName={lastName}
        />
      )}
    </div>
  );
}
