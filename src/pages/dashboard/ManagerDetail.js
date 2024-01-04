import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getManagerDetail, getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ManagerDetailForm from '../../components/_dashboard/manager/ManagerDetailForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { user } = useSelector((state) => state.user);
  const isEdit = pathname.includes('edit');
  const managerUserId = pathname.split('/').pop().trim();

  // const currentUser = {};
  // const currentUser = userList.find((user) => paramCase(user.userId) === managerUserId);

  useEffect(() => {
    dispatch(getManagerDetail(managerUserId));
  }, [dispatch]);

  return (
    <Page title="Manager: Detail | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Manager detail' : 'Manager detail'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Manager', href: PATH_DASHBOARD.managerAccount.list },
            { name: !isEdit ? 'New user' : name }
          ]}
        />

        <ManagerDetailForm isEdit={isEdit} currentUser={user} />
      </Container>
    </Page>
  );
}
