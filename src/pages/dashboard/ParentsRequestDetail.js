import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getParentsRequest, getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewForm from '../../components/_dashboard/e-commerce/ProductNewForm';
import ParentsRequestForm from '../../components/_dashboard/parents/ParentsRequestForm';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { product } = useSelector((state) => state.product);
  const isEdit = pathname.includes('edit');
  const parentRequestID = pathname.split('/').pop().trim();
  // const currentProduct = products.find((product) => paramCase(product.name) === name);
  useEffect(() => {
    dispatch(getParentsRequest(parentRequestID));
  }, [dispatch]);

  // console.log(currentProduct);

  return (
    <Page title="Parents: Request detail | Tutor Center">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Request detail' : 'Request edit'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Requests',
              href: PATH_DASHBOARD.parents.request
            },
            { name: 'Request detail' }
          ]}
        />

        <ParentsRequestForm isEdit={isEdit} currentProduct={product} />
      </Container>
    </Page>
  );
}
