import PropTypes from 'prop-types';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const imageUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzOTUuNTIgMjQ3LjIiIGhlaWdodD0iMjQ3LjIiIHdpZHRoPSIzOTUuNTIiPjxnPjxzdmcvPjwvZz48Zz48c3ZnIHZpZXdCb3g9IjAgMCAzOTUuNTIgMjQ3LjIiIGhlaWdodD0iMjQ3LjIiIHdpZHRoPSIzOTUuNTIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMzkuNTUxOTk5OTk5OTk5OTksNDEuMjM3NDk4NjI2OTEyNTEpIj48c3ZnIHZpZXdCb3g9IjAgMCAzMTYuNDE2IDE2NC43MjUwMDI3NDYxNzQ5NyIgaGVpZ2h0PSIxNjQuNzI1MDAyNzQ2MTc0OTciIHdpZHRoPSIzMTYuNDE2Ij48Zz48c3ZnIHZpZXdCb3g9IjAgMCAzMTYuNDE2IDE2NC43MjUwMDI3NDYxNzQ5NyIgaGVpZ2h0PSIxNjQuNzI1MDAyNzQ2MTc0OTciIHdpZHRoPSIzMTYuNDE2Ij48Zz48c3ZnIHZpZXdCb3g9IjAgMCAzMTYuNDE2IDE2NC43MjUwMDI3NDYxNzQ5NyIgaGVpZ2h0PSIxNjQuNzI1MDAyNzQ2MTc0OTciIHdpZHRoPSIzMTYuNDE2Ij48Zz48c3ZnIHZpZXdCb3g9IjAgMCAzMTYuNDE2IDE2NC43MjUwMDI3NDYxNzQ5NyIgaGVpZ2h0PSIxNjQuNzI1MDAyNzQ2MTc0OTciIHdpZHRoPSIzMTYuNDE2Ij48ZyBpZD0idGV4dGJsb2NrdHJhbnNmb3JtIj48c3ZnIHZpZXdCb3g9IjAgMCAzMTYuNDE2IDE2NC43MjUwMDI3NDYxNzQ5NyIgaGVpZ2h0PSIxNjQuNzI1MDAyNzQ2MTc0OTciIHdpZHRoPSIzMTYuNDE2IiBpZD0idGV4dGJsb2NrIj48Zz48c3ZnIHZpZXdCb3g9IjAgMCAzMTYuNDE2IDE2NC43MjUwMDI3NDYxNzQ5NyIgaGVpZ2h0PSIxNjQuNzI1MDAyNzQ2MTc0OTciIHdpZHRoPSIzMTYuNDE2Ij48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDAsMCkiPjxzdmcgd2lkdGg9IjMxNi40MTYiIHZpZXdCb3g9IjEuMjcgLTMyLjQgNjIuMjMgMzIuNCIgaGVpZ2h0PSIxNjQuNzI1MDAyNzQ2MTc0OTciIGRhdGEtcGFsZXR0ZS1jb2xvcj0iIzRiOTFmMSI+PHBhdGggZD0iTTkuNzIgMEw5LjcyLTIzLjY2IDIwLjk1LTIzLjY2IDIwLjk1IDAgOS43MiAwWk0xLjI3LTI1LjM0TDEuMjctMzIuNCAyOS4zOS0zMi40IDI5LjM5LTI1LjM0IDEuMjctMjUuMzRaTTQzLjgyLTMyLjRMNDMuODIgMCAzOS41MiAwIDMzLjAzLTYuNDcgMzMuMDMtMjUuOTMgMzkuNTItMzIuNCA0My44Mi0zMi40Wk01Mi43MS0yNS45M0w0NS41My0yNS45MyA0NS41My0zMi40IDU3LjAzLTMyLjQgNjMuNS0yNS45MyA2My41LTE5LjQxIDUyLjcxLTE5LjQxIDUyLjcxLTI1LjkzWk01Ny4wMyAwTDQ1LjUzIDAgNDUuNTMtNi40NyA1Mi43MS02LjQ3IDUyLjcxLTExLjIxIDYzLjUtMTEuMjEgNjMuNS02LjQ3IDU3LjAzIDBaIiBvcGFjaXR5PSIxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDAsMCkiIGZpbGw9IiM0YjkxZjEiIGNsYXNzPSJ3b3JkbWFyay10ZXh0LTAiIGRhdGEtZmlsbC1wYWxldHRlLWNvbG9yPSJwcmltYXJ5IiBpZD0idGV4dC0wIi8+PC9zdmc+PC9nPjwvc3ZnPjwvZz48L3N2Zz48L2c+PC9zdmc+PC9nPjwvc3ZnPjwvZz48L3N2Zz48L2c+PC9zdmc+PC9nPjxnPjxwYXRoIGQ9Ik0wIDI0Ny4ydi0yNDcuMmgzOTUuNTJ2MjQ3LjJ6TTM4MC42NjUgMjMyLjM0NXYtMjE3LjQ5aC0zNjUuODF2MjE3LjQ5eiIgZmlsbD0iIzRiOTFmMSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCIgZGF0YS1maWxsLXBhbGV0dGUtY29sb3I9InRlcnRpYXJ5Ii8+PC9nPjwvc3ZnPjwvZz48ZGVmcy8+PC9zdmc+';

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}
      <img
        src= {imageUrl}
        alt="gfg-logo"
        width="100%" height="100%"
      />
    </Box>
  );
}
