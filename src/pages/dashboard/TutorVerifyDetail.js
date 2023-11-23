import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts, getRequestVerification } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewForm from '../../components/_dashboard/e-commerce/ProductNewForm';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { product } = useSelector((state) => state.product);
  const isEdit = pathname.includes('edit');
  const tutorRequestID = pathname.split('/').pop().trim();
  // console.log(tutorRequestID);
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getRequestVerification(tutorRequestID));
  }, [dispatch]);

  return (
    <Page title="Tutor: Verification request | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Verification request' : 'Verification request'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Tutor',
              href: PATH_DASHBOARD.tutor.list
            },
            { name: 'Verification request' }
          ]}
        />

        <ProductNewForm isEdit={isEdit} currentProduct={product} />
      </Container>
    </Page>
  );
}
