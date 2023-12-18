// material
import { Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogNewPostForm } from '../../components/_dashboard/blog';
import BlogEditPostForm from '../../components/_dashboard/blog/BlogEditPostForm';
import { getBlog } from '../../redux/slices/product';

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getBlog(blogId));
  }, [dispatch]);

  const isEdit = pathname.includes('edit');
  const blogId = pathname.split('/').pop().trim();

  // console.log('isEdit ', isEdit);
  // console.log('blogId ', blogId);

  // console.log(product);
  return (
    <Page title="Blog: Post | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.list },
            { name: 'Post' }
          ]}
        />
        {(isEdit) ?
          <BlogEditPostForm isEdit={isEdit} currentProduct={product} blogId={blogId}/>
          :
          <BlogNewPostForm />
        }
      </Container>
    </Page>
  );
}
