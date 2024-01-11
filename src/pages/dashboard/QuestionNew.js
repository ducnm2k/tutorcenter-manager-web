import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts, getQuestionDetail, getRequestVerification } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import QuestionNewForm from '../../components/_dashboard/question/QuestionNewForm';
import QuestionDetailForm from '../../components/_dashboard/question/QuestionDetailForm';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { product } = useSelector((state) => state.product);
  const isEdit = pathname.includes('edit');
  const questionId = pathname.split('/').pop().trim();
  // console.log(tutorRequestID);
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    // dispatch(getRequestVerification(tutorRequestID));
    if(isEdit){
      dispatch(getQuestionDetail(questionId));
    }
  }, [dispatch]);

  return (
    <Page title="New Question | Tutor Center">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'New Question' : 'Edit Question'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Question',
              href: PATH_DASHBOARD.question.list
            },
            { name: 'Question detail' }
          ]}
        />

        {(isEdit) ?
          <QuestionDetailForm isEdit={isEdit} currentProduct={product} />
          :
          <QuestionNewForm isEdit={isEdit} currentProduct={product} />
        }

      </Container>
    </Page>
  );
}
