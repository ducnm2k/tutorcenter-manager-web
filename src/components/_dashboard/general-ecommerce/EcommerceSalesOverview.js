import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// material
import PropTypes from 'prop-types';
import { Card, CardHeader, Typography, Stack, LinearProgress } from '@material-ui/core';
// utils
import { fPercent, fCurrency } from '../../../utils/formatNumber';
import mockData from '../../../utils/mock-data';
// import { getStatisticTotalSales } from '../../../redux/slices/product';

// ----------------------------------------------------------------------

const LABELS = ['Total Profit', 'Total Income', 'Total Expenses'];



// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    label: PropTypes.string,
    amount: PropTypes.number,
    value: PropTypes.number
  })
};

function ProgressItem({ progress }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>
        <Typography variant="subtitle2">{fCurrency(progress.amount)}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({fPercent(progress.value)})
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        color={
          (progress.label === 'Total Income' && 'info') ||
          (progress.label === 'Total Expenses' && 'warning') ||
          'primary'
        }
      />
    </Stack>
  );
}

export default function EcommerceSalesOverview() {
  const dispatch = useDispatch();
  // const { totalSales } = useSelector((state) => state.totalSales);

  useEffect(() => {
    // dispatch(getStatisticTotalSales());
  }, [dispatch]);

  const MOCK_SALES = [...Array(3)].map((_, index) => ({
    label: LABELS[index],
    amount: mockData.number.price(index) * 100,
    value: mockData.number.percent(index)
  }));

  return (
    <Card>
      <CardHeader title="Sales Overview" />
      <Stack spacing={4} sx={{ p: 3 }}>
        {MOCK_SALES.map((progress) => (
          <ProgressItem key={progress.label} progress={progress} />
        ))}
        
        {/* <ProgressItem key='Total Tuition' progress={product.totalTuition} />
        <ProgressItem key='Total Paid' progress={product.totalPaid} />
        <ProgressItem key='Total Revenue' progress={product.totalRevenue} /> */}
      </Stack>
    </Card>
  );
}
