import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel,
  Button
} from '@material-ui/core';
// utils
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import { getCheckEmailExisted, postNewManagerAccount, putEditManagerAccount } from '../../../redux/slices/user';

// import countries from './countries';

// ----------------------------------------------------------------------

ManagerDetailForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function ManagerDetailForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    fullname: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
    confirm: Yup.string().required('Confirm password is required'),
    // address: Yup.string().required('Address is required'),
    // country: Yup.string().required('country is required'),
    // company: Yup.string().required('Company is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    // role: Yup.string().required('Role Number is required'),
    // avatarUrl: Yup.mixed().required('Avatar is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: currentUser?.userId || 0,
      fullname: currentUser?.fullname || ' ',
      email: currentUser?.email || ' ',
      phone: currentUser?.phone || ' ',
      password: currentUser?.password || ' ',
      confirm: currentUser?.confirm || ' ',
      // address: currentUser?.address || '',
      // country: currentUser?.country || '',
      // state: currentUser?.state || '',
      // city: currentUser?.city || '',
      // zipCode: currentUser?.zipCode || '',
      // avatarUrl: currentUser?.avatarUrl || null,
      // isVerified: currentUser?.isVerified || true,
      status: currentUser?.status || 0,
      // company: currentUser?.company || '',
      // role: currentUser?.role || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const emailExist = await axios.get(`/api/auth/emailExist/${values.email}`);
        if (!emailExist.data.data) {
          // update
          if (isEdit) {
            dispatch(putEditManagerAccount(values));
            // await fakeRequest(500);
            resetForm();
            setSubmitting(false);
            enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
            navigate(PATH_DASHBOARD.managerAccount.list);
          }

          // add new
          else if (!isEdit) {
            if (values.confirm === values.password) {
              dispatch(postNewManagerAccount(values));
              // await fakeRequest(500);
              resetForm();
              setSubmitting(false);
              enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
              navigate(PATH_DASHBOARD.managerAccount.list);
            }
            else {
              enqueueSnackbar('Please confirm password again!', { variant: 'error' });
            }
          }
        }
        else {
          enqueueSnackbar('Email existed!', { variant: 'error' });
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {isEdit && (
                <Label
                  color={values.status !== 'active' ? 'error' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.avatarUrl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.avatarUrl && errors.avatarUrl}
                </FormHelperText>
              </Box>

              {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(event) => setFieldValue('status', event.target.checked ? 'banned' : 'active')}
                      checked={values.status !== 'active'}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

              <FormControlLabel
                labelPlacement="start"
                control={<Switch {...getFieldProps('isVerified')} checked={values.isVerified} />}
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Card>
          </Grid> */}

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...getFieldProps('fullname')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  {/* <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField> */}
                </Stack>

                {(!isEdit) ?
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                      fullWidth
                      label="Password"
                      type='password'
                      {...getFieldProps('password')}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <TextField
                      fullWidth
                      label="Confirm"
                      type='password'
                      {...getFieldProps('confirm')}
                      error={Boolean(touched.confirm && errors.confirm)}
                      helperText={touched.confirm && errors.confirm}
                    />
                  </Stack>
                  :
                  <></>
                }


                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="District"
                    {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  />
                  <TextField
                    fullWidth
                    label="Province/City"
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Stack> */}

                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField fullWidth label="Zip/Code" {...getFieldProps('zipCode')} />
                </Stack> */}

                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Company"
                    {...getFieldProps('company')}
                    error={Boolean(touched.company && errors.company)}
                    helperText={touched.company && errors.company}
                  />
                  <TextField
                    fullWidth
                    label="Role"
                    {...getFieldProps('role')}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  />
                </Stack> */}

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }} >
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Box>
                {(isEdit) ?
                  <Button variant="contained" color='error' sx={{ ml: 2 }}>Ban</Button>
                  :
                  <></>
                }
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
