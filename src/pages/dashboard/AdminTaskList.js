import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
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
import { getProducts, deleteProduct, getParentClassList, putAutoAssign, getAdminTaskList } from '../../redux/slices/product';
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
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Task Id', alignRight: false },
  { id: 'name', label: 'Type', alignRight: false },
  // { id: 'requestId', label: 'Request Id', alignRight: false },
  { id: 'managerEmail', label: 'Manager Email', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'dateCreate', label: 'Create At', alignRight: false },
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
    return filter(array, (_product) => _product.managerEmail.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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
    return filter(array, (_product) => _product.status === 2);
  }

  return stabilizedThis.map((el) => el[0]);
}



// ----------------------------------------------------------------------

export default function EcommerceProductList() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
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
    dispatch(getAdminTaskList());
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
    setFilterStatus('');
    // console.log('filterStatus', filterStatus);
  };

  const handleStatusNeedHandleClick = (e) => {
    setFilterStatus('2');
    console.log('filterStatus', filterStatus);
  };

  const handleAutoAssign = () => {
    console.log('clicked');
    dispatch(putAutoAssign());
    // resetForm();
    // setSubmitting(false);
    enqueueSnackbar('Assign success', { variant: 'success' });
  }

  const adminStatusColor = (status) => {
    if (status === 0) return 'primary';
    if (status === 1) return 'default';
    if (status === 2) return 'success';
    if (status === 3) return 'error';
    if (status === 4) return 'success';
  }

  const managerStatusColor = (status) => {
    if (status === 0) return 'default';
    if (status === 1) return 'primary';
    if (status === 2) return 'success';
    if (status === 3) return 'error';
    if (status === 4) return 'primary';
  }

  return (
    <Page title="Task list | Tutor Center">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <div>
          <HeaderBreadcrumbs
            heading="Task list"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.assign },
              { name: 'Task list' }
            ]}
          // action={
          //   <Button
          //     variant="contained"
          //     onClick={handleAutoAssign}
          //   >
          //     Auto Assign
          //   </Button>
          // }
          />
          {/* {(user?.role === 'ADMIN') ?
            <Button
              variant="contained"
              onClick={handleAutoAssign}
            >
              Auto Assign
            </Button>
            :
            <></>
          } */}
          {/* <Button
            variant="contained"
            onClick={handleAutoAssign}
          >
            Auto Assign
          </Button> */}
        </div>

        <Card>
          <ProductListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
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
                    const { id, name, requestId, type, managerEmail, status, dateCreate } = row;

                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        // component={RouterLink}
                        // to={`${PATH_DASHBOARD.parents.root}/class/edit/${id}`}
                        sx={{ textDecoration: 'none' }}
                      >
                        <TableCell padding="checkbox">
                          { }
                        </TableCell>
                        <TableCell padding="checkbox">
                          {id}
                        </TableCell>
                        {/* <TableCell padding="checkbox">
                          { }
                        </TableCell> */}
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
                              {name}
                            </Typography>
                          </Box>
                        </TableCell>
                        {/* <TableCell style={{ minWidth: 160 }}>{requestId}</TableCell> */}
                        {/* <TableCell style={{ minWidth: 160 }}>{type}</TableCell> */}
                        <TableCell style={{ minWidth: 160 }}>{managerEmail}</TableCell>
                        
                        {(user?.role === 'ADMIN') ?
                          <TableCell style={{ minWidth: 160 }}>
                            <Label
                              // variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              // color={
                              //   (inventoryType === 'out_of_stock' && 'error') ||
                              //   (inventoryType === 'low_stock' && 'warning') ||
                              //   'success'
                              // }
                              // color={(status === 2) ? 'success' : 'error'}
                              color={adminStatusColor(status)}
                              variant={(status === 0) ? 'filled' : 'outlined'}
                            >
                              {(status === 1) ? 'assigned' : ''}
                              {(status === 2) ? 'finished' : ''}
                              {(status === 3) ? 'finished late' : ''}
                              {(status === 4) ? 're-assigned' : ''}
                              {(status === 0) ? 'unassigned' : ''}
                            </Label>
                          </TableCell>
                          :
                          <TableCell style={{ minWidth: 160 }}>
                            <Label
                              // variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              // color={
                              //   (inventoryType === 'out_of_stock' && 'error') ||
                              //   (inventoryType === 'low_stock' && 'warning') ||
                              //   'success'
                              // }
                              // color={(status === 2) ? 'success' : 'error'}
                              color={managerStatusColor(status)}
                              variant={(status === 1) ? 'filled' : 'outlined'}
                            >
                              {(status === 1) ? 'assigned' : ''}
                              {(status === 2) ? 'finished' : ''}
                              {(status === 3) ? 'finished late' : ''}
                              {(status === 4) ? 're-assigned' : ''}
                              {(status === 0) ? 'unassigned' : ''}
                            </Label>
                          </TableCell>
                        }

                        <TableCell style={{ minWidth: 160 }}>{dateCreate}</TableCell>
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
