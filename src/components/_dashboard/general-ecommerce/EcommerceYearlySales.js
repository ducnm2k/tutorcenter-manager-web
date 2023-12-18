import { merge } from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

export default function EcommerceYearlySales() {
  const [seriesData, setSeriesData] = useState(2019);
  const { product } = useSelector((state) => state.product);

  const chartD = product?.[2];
  console.log(chartD);

  const CHART_DATA = [
    {
      year: 2019,
      data: [
        { name: 'Total Income', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, chartD?.[0]?.data['11-2023']?.totalTuition, chartD?.[0]?.data['12-2023']?.totalTuition] },
        { name: 'Total Expenses', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, chartD?.[0]?.data['11-2023']?.totalPaid, chartD?.[0]?.data['12-2023']?.totalPaid] }
      ]
    },
    {
      year: 2020,
      data: [
        { name: 'Total Income', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: 'Total Expenses', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
      ]
    }
  ];

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  });

  return (
    <Card>
      <CardHeader
        title="Yearly Sales"
        subheader="(+43%) than last year"
        // action={
        //   <TextField
        //     select
        //     fullWidth
        //     value={seriesData}
        //     SelectProps={{ native: true }}
        //     onChange={handleChangeSeriesData}
        //     sx={{
        //       '& fieldset': { border: '0 !important' },
        //       '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
        //       '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
        //       '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
        //     }}
        //   >
        //     {CHART_DATA.map((option) => (
        //       <option key={option.year} value={option.year}>
        //         {option.year}
        //       </option>
        //     ))}
        //   </TextField>
        // }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="area" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
