import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getParentsClazz, getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewForm from '../../components/_dashboard/e-commerce/ProductNewForm';
import ParentsRequestForm from '../../components/_dashboard/parents/ParentsRequestForm';
import ParentsClazzForm from '../../components/_dashboard/parents/ParentsClazzForm';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { product } = useSelector((state) => state.product);
  const isEdit = pathname.includes('edit');
  const parentClazzID = pathname.split('/').pop().trim();
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getParentsClazz(parentClazzID));
  }, [dispatch]);

  return (
    <Page title="Parents: Class Detail | Tutor Center">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Class Detail' : 'Class Detail'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Classes',
              href: PATH_DASHBOARD.parents.class
            },
            { name: 'Class detail' }
          ]}
        />

        <ParentsClazzForm isEdit={isEdit} currentProduct={product} />
      </Container>
    </Page>
  );
}
