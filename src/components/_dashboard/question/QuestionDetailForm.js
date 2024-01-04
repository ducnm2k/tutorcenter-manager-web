import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
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
  FormControlLabel,
  Box,
  Button
} from '@material-ui/core';
import { delDeleletQuestion, putUpdateQuestion, updateStatusRequestVerification } from '../../../redux/slices/product';
// utils
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { QuillEditor } from '../../editor';
import { UploadMultiFile, UploadSingleFile } from '../../upload';

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

QuestionDetailForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function QuestionDetailForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // description: Yup.string().required('Description is required'),
    // images: Yup.array().min(1, 'Images is required'),
    // price: Yup.number().required('Price is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: currentProduct?.id || 0,
      subjectId: currentProduct?.subjectId || 0,
      subjectName: currentProduct?.subjectName || '',
      subjectLevel: currentProduct?.subjectLevel || '',
      difficulty: currentProduct?.difficulty || 0,
      content: currentProduct?.content || '',
      dateCreate: currentProduct?.dateCreate || '',
      answers: currentProduct?.answers || [],
      option1: currentProduct?.answers[0]?.content || '',
      option2: currentProduct?.answers[1]?.content || '',
      option3: currentProduct?.answers[2]?.content || '',
      option4: currentProduct?.answers[3]?.content || '',
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
        // update answer
        dispatch(putUpdateQuestion(values));
        // resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.question.list);
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

  // const IMG_ID = values.imgId.split("~");

  const handleDeleteButton = () => {
    if(window.confirm('Are you sure you want to delete this question?') === true){

      dispatch(delDeleletQuestion(values.id));
      console.log('question deleted!');
      navigate(PATH_DASHBOARD.question.list);
    }
    else {
      console.log('canceled!');
    }
  };

  // function getSubjectFromSubjects() {
  //   let rs = ' ';
  //   if (values.subjects.length === 0) rs = 'Chưa chọn môn';
  //   if (values.subjects.length === 1) {
  //     // console.log(values.subject.concat(' ').concat(values.level));
  //     rs = rs.concat(values.subjects[0].name).concat(' ').concat(values.subjects[0].level);
  //   }
  //   if (values.subjects.length > 1) {
  //     for (let index = 0; index < values.subjects.length; index += 1) {
  //       rs = rs.concat(values.subjects[index].name).concat(' ').concat(values.subjects[index].level).concat(' | ');
  //     }
  //     // console.log(rs);
  //   }

  //   return rs;
  // }

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                {/* <div>
                  <LabelStyle>Template: </LabelStyle>
                  <Button href=''>Click here to download!</Button>
                </div> */}

                {/* <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Tutor Id"
                  {...getFieldProps('tutorId')}
                /> */}

                <TextField
                  fullWidth
                  InputProps={{
                    // readOnly: true,
                  }}
                  label="Question Content"
                  {...getFieldProps('content')}
                />

                <TextField
                  fullWidth
                  label="Subjects"
                  InputProps={{
                    readOnly: true,
                  }}
                  // {...getFieldProps('subject')}
                  value={values.subjectName.concat(' ').concat(values.subjectLevel)}
                />

                <TextField
                  fullWidth
                  InputProps={{
                    // readOnly: true,
                  }}
                  label="Correct Options"
                  {...getFieldProps('option1')}
                  // value={values.answers[0]?.content
                />

                <TextField
                  fullWidth
                  InputProps={{
                    // readOnly: true,
                  }}
                  label="Wrong Options"
                  {...getFieldProps('option2')}
                  // value={values.answers[1]?.content}
                />

                <TextField
                  fullWidth
                  InputProps={{
                    // readOnly: true,
                  }}
                  label="Wrong Options"
                  {...getFieldProps('option3')}
                  // value={values.answers[2]?.content}
                />

                <TextField
                  fullWidth
                  InputProps={{
                    // readOnly: true,
                  }}
                  label="Wrong Options"
                  {...getFieldProps('option4')}
                  // value={values.answers[3]?.content}
                />

                {/* <LabelStyle>Certificate</LabelStyle>
                <Box
                  fullWidth
                  component="img"
                  alt="Certificate image"
                  src={"http://localhost:9000/api/user/image/".concat(values.imgCertificate)}
                /> */}

                {/* <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  label="IdCard"
                  {...getFieldProps('imgId')}
                /> */}

                {/* <Box
                  fullWidth
                  component="img"
                  alt="ID card image 1"
                  src={"http://localhost:9000/api/user/image/".concat(IMG_ID[0])}
                />
                <Box
                  fullWidth
                  component="img"
                  alt="ID card image 2"
                  src={"http://localhost:9000/api/user/image/".concat(IMG_ID[1])}
                /> */}

                {/* <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Subjects"
                  {...getFieldProps('subjects')}
                /> */}

                {/* <div>
                  <LabelStyle>Description</LabelStyle>
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
                  <LabelStyle>Add File</LabelStyle>
                  <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    accept=".xlsx, .xlsm, .xlsb, .xltx, .xltm, .xls, .xlt, .xml, .xlam, .xla, .xlw, .xlr"
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

                  <UploadSingleFile
                    showPreview
                    maxSize={3145728}
                    // accept="image/*"
                    files={values.images}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                  />
                </div> */}
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <LabelStyle>Difficulty</LabelStyle>

                <div>
                  <RadioGroup {...getFieldProps('difficulty')} value={values.difficulty} row>
                    <Stack spacing={1} direction="row">
                      <FormControlLabel value="1" control={<Radio />} label="Easy" />
                      <FormControlLabel value="2" control={<Radio />} label="Normal" />
                      <FormControlLabel value="3" control={<Radio />} label="Hard" />
                    </Stack>
                  </RadioGroup>
                </div>

                {/* <TextField
                  fullWidth
                  label="difficulty"
                  {...getFieldProps('difficulty')}
                /> */}

                {/* <FormControlLabel
                  control={<Switch {...getFieldProps('inStock')} checked={values.inStock} />}
                  label="In stock"
                  sx={{ mb: 2 }}
                /> */}

                {/* <Stack spacing={3}>
                  <TextField fullWidth label="Product Code" {...getFieldProps('code')} />
                  <TextField fullWidth label="Product SKU" {...getFieldProps('sku')} />

                  <div>
                    <LabelStyle>Gender</LabelStyle>
                    <RadioGroup {...getFieldProps('gender')} row>
                      <Stack spacing={1} direction="row">
                        {GENDER_OPTION.map((gender) => (
                          <FormControlLabel key={gender} value={gender} control={<Radio />} label={gender} />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </div>

                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" native {...getFieldProps('category')} value={values.category}>
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
                  </FormControl>
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
              </Card>

              {/* <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Regular Price"
                    {...getFieldProps('price')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />

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

              <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting} >
                {!isEdit ? 'Create Questions' : 'Save Changes'}
              </LoadingButton>

              <Button variant="contained" size="large" color='error' onClick={handleDeleteButton}>
                Delete
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
