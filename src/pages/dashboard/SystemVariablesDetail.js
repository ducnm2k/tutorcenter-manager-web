import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAdminVariableDetail, getParentsRequest, getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import SystemVariableForm from '../../components/_dashboard/admin/SystemVariableForm';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { product } = useSelector((state) => state.product);
  const isEdit = pathname.includes('edit');
  const varKey = pathname.split('/').pop().trim();
  // const currentProduct = products.find((product) => paramCase(product.name) === name);
  useEffect(() => {
    dispatch(getAdminVariableDetail(varKey));
  }, [dispatch]);

  // console.log(currentProduct);

  return (
    <Page title="System Variable: Detail | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'System Variable detail' : 'System Variable edit'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'System Variable',
              href: PATH_DASHBOARD.variables
            },
            { name: 'System Variable detail' }
          ]}
        />

        <SystemVariableForm isEdit={isEdit} currentProduct={product} />
      </Container>
    </Page>
  );
}
