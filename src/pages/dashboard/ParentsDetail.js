import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';
import ParentsDetailForm from '../../components/_dashboard/parents/ParentsDetailForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { userList } = useSelector((state) => state.user);
  const isEdit = pathname.includes('edit');
  const currentUser = userList.find((user) => paramCase(user.name) === name);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <Page title="Parents: Detail | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Parents detail' : 'Parents detail'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Parents', href: PATH_DASHBOARD.parents.list },
            { name: !isEdit ? 'New user' : name }
          ]}
        />

        <ParentsDetailForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
