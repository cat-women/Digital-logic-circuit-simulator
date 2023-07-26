import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      backgroundColor: '#665a5a'
    },
    '& .MuiContainer-root': {}
  },
  container: {},
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    backgroundColor: '#e6e8e7',
    alignItems: 'center',
    alignContent: 'stretch',
    justifyContent: 'space-evenly'
  },
  form: {
    padding: theme.spacing(3),
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  heading: {
    color: 'black'
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    color: 'black',
    fontSize: '25px',
    padding: '3px',
    margin: '6px'
  },
  btnSwitch: {
    color: 'black'
  },
  footer1: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%'
  },
  footer: {
    marginTop: '30px'
  },
  btnSubmit: {
    marginTop: '30px',
    backgroundColor: '#336e45',
    color: 'white',
    '&:hover': {
      backgroundColor: '#00b51f'
    }
  }
}))
