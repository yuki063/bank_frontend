// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// _mock
import { _bankingContacts, _bankingCreditCard, _bankingRecentTransitions } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
//
import BankingContacts from '../banking-contacts';
import BankingQuickTransfer from '../banking-quick-transfer';
import BankingInviteFriends from '../banking-invite-friends';
import BankingWidgetSummary from '../banking-widget-summary';
import BankingCurrentBalance from '../banking-current-balance';
import BankingBalanceStatistics from '../banking-balance-statistics';
import BankingRecentTransitions from '../banking-recent-transitions';
// import BankingExpensesCategories from '../banking-expenses-categories';

// ----------------------------------------------------------------------

export default function OverviewBankingView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={7}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <BankingWidgetSummary
              title="Received"
              icon="eva:diagonal-arrow-left-down-fill"
              percent={2.6}
              total={18765}
              chart={{
                series: [
                  { x: 2010, y: 88 },
                  { x: 2011, y: 120 },
                  { x: 2012, y: 156 },
                  { x: 2013, y: 123 },
                  { x: 2014, y: 88 },
                  { x: 2015, y: 66 },
                  { x: 2016, y: 45 },
                  { x: 2017, y: 29 },
                  { x: 2018, y: 45 },
                  { x: 2019, y: 88 },
                  { x: 2020, y: 132 },
                  { x: 2021, y: 146 },
                  { x: 2022, y: 169 },
                  { x: 2023, y: 184 },
                ],
              }}
            />

            <BankingWidgetSummary
              title="Sent"
              color="warning"
              icon="eva:diagonal-arrow-right-up-fill"
              percent={-0.5}
              total={8938}
              chart={{
                series: [
                  { x: 2010, y: 88 },
                  { x: 2011, y: 120 },
                  { x: 2012, y: 156 },
                  { x: 2013, y: 123 },
                  { x: 2014, y: 88 },
                  { x: 2015, y: 166 },
                  { x: 2016, y: 145 },
                  { x: 2017, y: 129 },
                  { x: 2018, y: 145 },
                  { x: 2019, y: 188 },
                  { x: 2020, y: 132 },
                  { x: 2021, y: 146 },
                  { x: 2022, y: 169 },
                  { x: 2023, y: 184 },
                ],
              }}
            />
          </Stack>
        </Grid>

        <Grid xs={12} md={5}>
          <BankingCurrentBalance list={_bankingCreditCard} />
        </Grid>
        <Grid xs={12} md={6}>
          <Stack spacing={3}>
            <BankingQuickTransfer title="Quick Transfer" list={_bankingContacts} />
          </Stack>
        </Grid>
        <Grid xs={12} md={6}>
          <Stack spacing={3}>
            <BankingContacts
              title="Contacts"
              subheader="You have 122 contacts"
              list={_bankingContacts.slice(-5)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={12}>
          <Stack spacing={2}>
            <BankingRecentTransitions
              title="Recent Transitions"
              tableData={_bankingRecentTransitions}
              tableLabels={[
                { id: 'description', label: 'Description' },
                { id: 'date', label: 'Date' },
                { id: 'amount', label: 'Amount' },
                { id: 'status', label: 'Status' },
                { id: '' },
              ]}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
