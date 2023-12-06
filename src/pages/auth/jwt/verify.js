import { Helmet } from 'react-helmet-async';
// sections
import { ClassicVerifyView } from 'src/sections/auth-demo/classic';

// ----------------------------------------------------------------------

export default function ClassicVerifyPage() {
  return (
    <>
      <Helmet>
        <title> Confirm code</title>
      </Helmet>

      <ClassicVerifyView />
    </>
  );
}
