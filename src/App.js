// i18n
import 'src/locales/i18n';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// sections
import { CheckoutProvider } from 'src/sections/checkout/context';
// auth
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt';

// byGoogle
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { AuthProvider, AuthConsumer } from 'src/auth/context/auth0';
// import { AuthProvider, AuthConsumer } from 'src/auth/context/amplify';
// import { AuthProvider, AuthConsumer } from 'src/auth/context/firebase';

// ----------------------------------------------------------------------

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(
  'pk_test_51OKw5bDgDmJR6QyjIBFJMVXAbiRZXNw3qNdC8eNOgs7m2AMl94htlAzxAClsJBSd0GvoySo46AvaApvqZV5gbWjU00RtckNl0K'
);
export default function App() {
  useScrollToTop();

  return (
    <Elements stripe={stripePromise}>
      <GoogleOAuthProvider clientId="439264173877-rlns0qqm3bbnea8dr1gb2kh9s8j3kcng.apps.googleusercontent.com">
        <AuthProvider>
          <ToastContainer />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <CheckoutProvider>
                      <SettingsDrawer />
                      <ProgressBar />
                      <AuthConsumer>
                        <Router />
                      </AuthConsumer>
                    </CheckoutProvider>
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Elements>
  );
}
