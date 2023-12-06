import PropTypes from 'prop-types';
import { useEffect } from 'react';
// routes
import { useRouter } from 'src/routes/hooks';
//
import { useCookies } from 'react-cookie';

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['token']);

  useEffect(() => {
    if (!cookies?.token) {
      document.location.href = '/login';
    } else if (cookies?.token == '') {
      document.location.href = '/login';
    }
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);

  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};
