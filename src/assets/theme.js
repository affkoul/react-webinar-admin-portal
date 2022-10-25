import 'assets/fonts/iransans/fontiran.css'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  direction: 'ltr',
  typography: {
    fontFamily: 'IRANSans, roboto',
    fontSize: 12,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: '#843b62',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f67e7d',
      contrastText: '#fff',
    },
  },
})

export default theme
