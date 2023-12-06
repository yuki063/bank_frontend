import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useSettingsContext } from 'src/components/settings';

import { _ecommerceSalesOverview } from 'src/_mock';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppAreaInstalled from '../app-area-installed';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';
// import EcommerceSalesOverview from '../../e-commerce/ecommerce-sales-overview';
// import EcommerceCurrentBalance from '../../e-commerce/ecommerce-current-balance';
// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const [cookies] = useCookies(['companyId', 'username', 'name', 'apiKey']);
  const settings = useSettingsContext();
  const [dashboardData, setDashboardData] = useState([]);
  const fetchData = async (cid, api_key) => {
    const response = await axios.get(
      `https://ocrtest-api.azurewebsites.net/api/dashboard?apikey=${api_key}&companyid=${cid}`
    );
    setDashboardData(response.data);
  };
  useEffect(() => {
    if (cookies?.companyId && cookies?.apiKey) {
      fetchData(cookies?.companyId, cookies?.apiKey);
    }
  }, [cookies]);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={6}>
        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title={dashboardData[0]?.label ? dashboardData[0]?.label : 'Earnings (Today)'}
            total={dashboardData[0]?.value ? dashboardData[0]?.value : '$100,000'}
            color={dashboardData[0]?.labelColor ? dashboardData[0]?.labelColor : '#4a71df'}
            icon="material-symbols:calendar-today"
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title={dashboardData[1]?.label ? dashboardData[1]?.label : 'Earnings (Annual)'}
            total={dashboardData[1]?.value ? dashboardData[1]?.value : '$100,000'}
            color={dashboardData[1]?.labelColor ? dashboardData[1]?.labelColor : '#4a71df'}
            icon="material-symbols:attach-money"
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title={dashboardData[2]?.label ? dashboardData[2]?.label : 'Pending Requests'}
            total={dashboardData[2]?.value ? dashboardData[2]?.value : '12'}
            color={dashboardData[2]?.labelColor ? dashboardData[2]?.labelColor : '#4a71df'}
            icon="material-symbols:task-outline-sharp"
          />
        </Grid>
        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title={dashboardData[3]?.label ? dashboardData[3]?.label : 'Invoice'}
            total={dashboardData[3]?.value ? dashboardData[3]?.value : '100'}
            color={dashboardData[3]?.labelColor ? dashboardData[3]?.labelColor : '#4a71df'}
            icon="material-symbols:chat"
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Invoices by Month"
            subheader=""
            chart={{
              categories: dashboardData[4]?.chartData?.map((item) => item.label),
              series: [
                {
                  year: '2023',
                  data: [
                    {
                      name: 'Invoices',
                      data: dashboardData[4]?.chartData?.map((item) => item.value),
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Suppliers by Invoice"
            chart={{
              series: dashboardData[6]?.chartData
                ? dashboardData[6]?.chartData
                : [
                    { label: 'Direct', value: 12244 },
                    { label: 'Social', value: 53345 },
                    { label: 'Referral', value: 44313 },
                  ],
            }}
          />
        </Grid>
        {/* <Grid xs={12} md={6} lg={6}>
          <EcommerceSalesOverview
            title="Invoices by GL Account"
            data={
              dashboardData[5]?.chartData ? dashboardData[5]?.chartData : _ecommerceSalesOverview
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <EcommerceCurrentBalance
            title={dashboardData[7]?.label ? dashboardData[7]?.label : 'Pending'}
            data={dashboardData[7]?.chartData ? dashboardData[7]?.chartData : []}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
