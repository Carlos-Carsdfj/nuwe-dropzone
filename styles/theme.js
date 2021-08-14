import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f934A',
      light: '#6AB972',
      dark: '#4f934A'
    },
    background: {
      dark: '#1B1D29',
      main: '#130F26',
      paper: '#2E353F'
    },
    secondary: {
      main: '#F0F0F0',
      dark: '#CDCDCD',
      light: '#FFFFFF'
    },
    warning: {
      main: '#130F26',
      light: '#232730'
    }
  },
  typography: {
    fontFamily: ['Montserrat', 'Roboto'].join(',')
  }
})

export default theme
