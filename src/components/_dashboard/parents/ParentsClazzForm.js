import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@material-ui/core/styles';
import { DatePicker, LoadingButton } from '@material-ui/lab';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Card,
  Chip,
  Grid,
  Stack,
  Radio,
  Switch,
  Select,
  TextField,
  InputLabel,
  Typography,
  RadioGroup,
  FormControl,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { createOrder, updateStatusParentsClass } from '../../../redux/slices/product';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';




// ----------------------------------------------------------------------

const GENDER_OPTION = ['Men', 'Women', 'Kids'];
const STATUS_OPTION = ['Default', 'Accept', 'Reject'];

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] }
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

ParentsClazzForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function ParentsClazzForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  // console.log('currentProduct', currentProduct);

  const NewProductSchema = Yup.object().shape({
    status: Yup.number().required('Status is required'),
    // parent: Yup.string().required('Name is required'),
    // description: Yup.string().required('Description is required'),
    // images: Yup.array().min(1, 'Images is required'),
    // price: Yup.number().required('Price is required'),
    // dateStart: Yup.string().required('date is required'),
    // dateEnd: Yup.string().required('date is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: currentProduct?.id || '',
      name: currentProduct?.parentName || '',
      phone: currentProduct?.phone || '',
      address: currentProduct?.address || '',
      districtName: currentProduct?.districtName || '',
      provinceName: currentProduct?.provinceName || '',
      status: currentProduct?.status || 0,
      subjects: currentProduct?.subjects || [],
      tuition: currentProduct?.tuition || 0,
      slots: currentProduct?.slots || 0,
      attendances: currentProduct?.attendances || 0,
      feedback: currentProduct?.feedback || '',
      rating: currentProduct?.rating || 0,
      // name: currentProduct?.name || '',
      // description: currentProduct?.description || '',
      // images: currentProduct?.images || [],
      // code: currentProduct?.code || '',
      // sku: currentProduct?.sku || '',
      // price: currentProduct?.price || '',
      // priceSale: currentProduct?.priceSale || '',
      // tags: currentProduct?.tags || [TAGS_OPTION[0]],
      // inStock: Boolean(currentProduct?.inventoryType !== 'out_of_stock'),
      // taxes: true,
      // gender: currentProduct?.gender || GENDER_OPTION[2],
      // category: currentProduct?.category || CATEGORY_OPTION[0].classify[1]
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // await fakeRequest(500);
        console.log(values.status);
        if (values.status === 2) {
          if (window.confirm("Confirm your transaction!")) {
            // set status class
            dispatch(updateStatusParentsClass(values));
            console.log("Update data", values);
            // create order
            dispatch(createOrder(values));
            console.log("create order", values);
            enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
          } else {
            enqueueSnackbar(!isEdit ? 'Transaction Canceled!' : 'Transaction Canceled!', { variant: 'error' });
            console.log('Transaction Canceled!');
          }

          resetForm();
          setSubmitting(false);
          navigate(PATH_DASHBOARD.parents.class);
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
      setFieldValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

  function myFunction() {
    let txt;
    if (window.confirm("Press a button!")) {
      txt = "You pressed OK!";
    } else {
      txt = "You pressed Cancel!";
    }
    console.log(txt);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <LabelStyle>Un-editable</LabelStyle>
                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Parent Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.parent && errors.parent)}
                  helperText={touched.parent && errors.parent}
                />

                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Phone"
                  {...getFieldProps('phone')}
                  error={Boolean(touched.parent && errors.parent)}
                  helperText={touched.parent && errors.parent}
                />

                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Address"
                  {...getFieldProps('address')}
                  error={Boolean(touched.parent && errors.parent)}
                  helperText={touched.parent && errors.parent}
                />

                <TextField
                  fullWidth
                  label="District"
                  InputProps={{
                    readOnly: true,
                  }}
                  {...getFieldProps('districtName')}
                />

                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Province"
                  {...getFieldProps('provinceName')}
                />

                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    startAdornment: <InputAdornment position="start">VND</InputAdornment>
                  }}
                  label="Tuition"
                  value={Intl.NumberFormat({style: 'currency'}).format(values.tuition)}
                  // {...getFieldProps('tuition')}
                />

                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Rating"
                  {...getFieldProps('rating')}
                />

                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Feedback"
                  {...getFieldProps('feedback')}
                />

                <div>
                  {/* <LabelStyle>Subject</LabelStyle>
                  <Select label="Subject" native {...getFieldProps('')} value={values.category} fullWidth> */}


                  {/* {CATEGORY_OPTION.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))} */}


                  {/* </Select> */}
                </div>

                <div>
                  {/* <LabelStyle>Level</LabelStyle>
                  <Select label="Level" native {...getFieldProps('')} value={values.category} fullWidth> */}


                  {/* {CATEGORY_OPTION.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))} */}


                  {/* </Select> */}
                </div>

                {/* <TextField
                  fullWidth
                  placeholder="Number of slots"
                  label="Slot"
                  {...getFieldProps('price')}
                  InputProps={{
                    type: 'number'
                  }}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                /> */}

                {/* <TextField
                  fullWidth
                  placeholder="Hour(s)"
                  label="Slot length"
                  {...getFieldProps('price')}
                  InputProps={{
                    type: 'number'
                  }}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                /> */}

                {/* <div>
                  <LabelStyle>Notes</LabelStyle>
                  <QuillEditor
                    simple
                    id="product-description"
                    value={values.description}
                    onChange={(val) => setFieldValue('description', val)}
                    error={Boolean(touched.description && errors.description)}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.description && errors.description}
                    </FormHelperText>
                  )}
                </div> */}

                {/* <div>
                  <LabelStyle>Reject reasons</LabelStyle>
                  <QuillEditor
                    simple
                    id="reasons-description"
                    value={values.description}
                    onChange={(val) => setFieldValue('description', val)}
                    error={Boolean(touched.description && errors.description)}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.description && errors.description}
                    </FormHelperText>
                  )}
                </div> */}

                {/* <div>
                  <LabelStyle>Add Images</LabelStyle>
                  <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    accept="image/*"
                    files={values.images}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.images && errors.images)}
                  />
                  {touched.images && errors.images && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.images && errors.images}
                    </FormHelperText>
                  )}
                </div> */}

              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                {/* <FormControlLabel
                  control={<Switch {...getFieldProps('inStock')} checked={values.inStock} />}
                  label="In stock"
                  sx={{ mb: 2 }}
                />

                <Stack spacing={3}>
                  <LabelStyle>Editable</LabelStyle>
                  <TextField fullWidth label="Slot" {...getFieldProps('slot')} />
                  <TextField fullWidth label="Slot length" {...getFieldProps('slotLength')} />
                  <TextField fullWidth label="Tuition" {...getFieldProps('tuition')} />
                  <TextField fullWidth label="Status" {...getFieldProps('status')} />
                  <TextField fullWidth label="Reject reason" {...getFieldProps('reject')} />
                  <div>
                    <TextField
                      fullWidth
                      label="Status"
                      {...getFieldProps('status')}
                      error={Boolean(touched.status && errors.status)}
                      helperText={touched.status && errors.status}
                    />
                    <RadioGroup {...getFieldProps('status')} row>
                      <Stack spacing={1} direction="row">
                        <FormControlLabel value="0" control={<Radio />} label="Default" />
                        <FormControlLabel value="1" control={<Radio />} label="Accept" />
                        <FormControlLabel value="2" control={<Radio />} label="Reject" />
                      </Stack>
                    </RadioGroup>
                  </div>

                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Status"
                      native
                      // displayEmpty
                      {...getFieldProps('status')}
                      value={values.status}
                    >
                      {STATUS_OPTION.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Reject reason"
                    {...getFieldProps('reject')}
                    error={Boolean(touched.parent && errors.parent)}
                    helperText={touched.parent && errors.parent}
                  />

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={option} size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => <TextField label="Tags" {...params} />}
                  />
                </Stack> */}
                <InputLabel>
                  Status: {(values.status === 0) ? 'Default' : ''}
                  {(values.status === 1) ? 'Start' : ''}
                  {(values.status === 2) ? 'End' : ''}
                  {(values.status === 3) ? 'Paid' : ''}
                  {(values.status === 4) ? 'Overdue' : ''}
                </InputLabel>
                <InputLabel>
                  Attendances: {values.attendances} / {values.slots}
                </InputLabel>
              </Card>

              {/* <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    placeholder="dd-MM-yyyy"
                    label="Start date"
                    {...getFieldProps('dateStart')}
                    // InputProps={{
                    //   type: 'number'
                    // }}
                    error={Boolean(touched.dateStart && errors.dateStart)}
                    helperText={touched.dateStart && errors.dateStart}
                  />

                  <TextField
                    fullWidth
                    placeholder="dd-MM-yyyy"
                    label="End date"
                    {...getFieldProps('dateEnd')}
                    // InputProps={{
                    //   type: 'number'
                    // }}
                    error={Boolean(touched.dateEnd && errors.dateEnd)}
                    helperText={touched.dateEnd && errors.dateEnd}
                  />

                  <DatePicker
                    // disabled={!isAdmin}
                    // disableFuture
                    inputFormat='dd/MM/yyyy'
                    label="Date Start"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={moment(values.dateStart, "DD/MM/YYYY")}
                    {...getFieldProps('dateStart')}
                    onChange={(newValue) => {
                      setFieldValue('dateStart', newValue);
                    }}
                    disabled
                    renderInput={(params) => <TextField {...params} error={Boolean(touched.dateStart && errors.dateStart)}
                      helperText={touched.dateStart && errors.dateStart} />}
                  />

                  <DatePicker
                    // disabled={!isAdmin}
                    // disableFuture
                    inputFormat='dd/MM/yyyy'
                    label="Date End"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={moment(values.dateStart, "DD/MM/YYYY")}
                    {...getFieldProps('dateEnd')}
                    onChange={(newValue) => {
                      setFieldValue('dateEnd', newValue);
                    }}
                    disabled
                    renderInput={(params) => <TextField {...params} error={Boolean(touched.dateStart && errors.dateStart)}
                      helperText={touched.dateStart && errors.dateStart} />}
                  />

                  <TextField
                    fullWidth
                    placeholder="dd-MM-yyyy"
                    label="Create date"
                    {...getFieldProps('price')}
                    InputProps={{
                      type: 'number'
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />

                  <TextField
                    fullWidth
                    placeholder="dd-MM-yyyy"
                    label="Modified date"
                    {...getFieldProps('price')}
                    InputProps={{
                      type: 'number'
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />

                  <Select label="Status" native {...getFieldProps('')} value={values.category} fullWidth>


                  {CATEGORY_OPTION.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))}


                  </Select>

                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Sale Price"
                    {...getFieldProps('priceSale')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                  />
                </Stack>

                <FormControlLabel
                  control={<Switch {...getFieldProps('taxes')} checked={values.taxes} />}
                  label="Price includes taxes"
                  sx={{ mt: 2 }}
                />
              </Card> */}

              {(values.status === 2) ?
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting} >
                  {!isEdit ? 'Create Product' : 'Pay Tutor'}
                </LoadingButton>
                :
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting} disabled>
                  {!isEdit ? 'Create Product' : 'Class Must End To Pay Tutor'}
                </LoadingButton>
              }
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
