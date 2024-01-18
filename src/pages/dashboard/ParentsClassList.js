import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts, deleteProduct, getParentClassList, getAllParentClassList } from '../../redux/slices/product';
// utils
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  ProductListHead,
  ProductListToolbar,
  ProductMoreMenu
} from '../../components/_dashboard/e-commerce/product-list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'id' },
  { id: 'id', label: 'Class Id', alignRight: false },
  { id: 'parentName', label: 'Parent', alignRight: false },
  // { id: 'subjects', label: 'Subjects', alignRight: false },
  { id: 'tuition', label: 'Tuition', alignRight: false },
  { id: 'districtName', label: 'Location', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(array, (_product) => _product.parentName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el) => el[0]);
}

function applyStatusFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  console.log(query);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(array, (_product) => (_product.status===2 || _product.status===8));
  }

  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function EcommerceProductList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('id');

  useEffect(() => {
    dispatch(getParentClassList());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(products, getComparator(order, orderBy), filterName);
  const filteredProductsByStatus = applyStatusFilter(filteredProducts, getComparator(order, orderBy), filterStatus);

  const isProductNotFound = filteredProducts.length === 0;

  const handleStatusAllClick = (e) => {
    dispatch(getAllParentClassList());
    // setFilterStatus('');
    // console.log('filterStatus', filterStatus);
  };

  const handleStatusNeedHandleClick = (e) => {
    dispatch(getParentClassList());
    // setFilterStatus('2');
    // console.log('filterStatus', filterStatus);
  };

  return (
    <Page title="Parents: Class List | Tutor Center">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Class List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Parents',
              href: PATH_DASHBOARD.parents.list
            },
            { name: 'Class List' }
          ]}
          // action={
          //   <Button
          //     variant="contained"
          //     component={RouterLink}
          //     to={PATH_DASHBOARD.eCommerce.newProduct}
          //     startIcon={<Icon icon={plusFill} />}
          //   >
          //     New Product
          //   </Button>
          // }
        />

        <Card>
          <ProductListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Button onClick={handleStatusAllClick}>General</Button>
          <Button onClick={handleStatusNeedHandleClick}>Your's</Button>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProductsByStatus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, parentName, subjects, tuition, districtName, provinceName, status } = row;

                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        component={RouterLink}
                        to={`${PATH_DASHBOARD.parents.root}/class/edit/${id}`}
                        sx={{ textDecoration: 'none' }}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} /> */}
                        </TableCell>
                        {/* <TableCell padding="checkbox">
                          {}
                        </TableCell> */}
                        <TableCell style={{ minWidth: 160 }}>{id}</TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Box
                            sx={{
                              py: 2,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            {/* <ThumbImgStyle alt={name} src={cover} /> */}
                            <Typography variant="subtitle2" noWrap>
                            {parentName}
                            </Typography>
                          </Box>
                        </TableCell>
                        {/* <TableCell style={{ minWidth: 160 }}>{(subjects.length === 0 )? 'Chưa chọn môn' : `${subjects[0].name}  ${subjects[0].level}`}</TableCell> */}
                        <TableCell style={{ minWidth: 160 }}>{Intl.NumberFormat({ style: 'currency' }).format(tuition)} VNĐ</TableCell>
                        <TableCell style={{ minWidth: 160 }}>{districtName}, {provinceName}</TableCell>
                        {/* <TableCell style={{ minWidth: 160 }}>{provinceName}</TableCell> */}
                        <TableCell style={{ minWidth: 160 }}>
                          <Label
                            // variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            // color={
                            //   (inventoryType === 'out_of_stock' && 'error') ||
                            //   (inventoryType === 'low_stock' && 'warning') ||
                            //   'success'
                            // }
                            // color={(status === 2) ? 'success' : 'error'}
                            color={(status === 2 || status === 3) ? 'primary' : 'default'}
                            variant={(status === 2 || status === 3) ? 'filled' : 'outlined'}
                          >
                            {(status === 1) ? 'available' : ''}
                            {(status === 2) ? 'start' : ''}
                            {(status === 3) ? 'end' : ''}
                            {(status === 4) ? 'cancel' : ''}
                            {(status === 0) ? 'default' : ''}
                          </Label>
                        </TableCell>
                        <TableCell align="right">
                          {/* <ProductMoreMenu onDelete={() => handleDeleteProduct(id)} productName={id} /> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isProductNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
