// material
import { Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceProductSold,
  EcommerceSalesProfit,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceTotalBalance,
  EcommerceSaleByGender,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance
} from '../../components/_dashboard/general-ecommerce';
import { getStatistic } from '../../redux/slices/product';

// ----------------------------------------------------------------------

export default function GeneralEcommerce() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getStatistic());
  }, [dispatch]);

  console.log(product);

  return (
    <Page title="General: E-commerce | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={8}>
            <EcommerceWelcome />
          </Grid> */}

          {/* <Grid item xs={12} md={4}>
            <EcommerceNewProducts />
          </Grid> */}

          <Grid item xs={12} md={4}>
            <EcommerceProductSold ongoingClass='15'/>
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceTotalBalance />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceSalesProfit />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <EcommerceSaleByGender />
          </Grid> */}

          <Grid item xs={12} md={12} >
            <EcommerceYearlySales />
          </Grid>

          {/* <Grid item xs={12} md={12} >
            <EcommerceSalesOverview />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <EcommerceCurrentBalance />
          </Grid> */}

          {/* <Grid item xs={12} md={12} >
            <EcommerceBestSalesman />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <EcommerceLatestProducts />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
