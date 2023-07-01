import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  table: {
    borderCollapse: 'collapse'
  },
  td: {
    height: '50px',
    width: '100px',
    border: '1px solid black',
    padding: '10px'
  },
  tdGray: {
    backgroundColor: '#fcfbf2'
  },
  tdGreen: {
    backgroundColor: 'green'
  },
  button: {
    border: 'none',
    padding: 0
  },
  left: {
    borderLeft: '4px solid #000'
  },
  top: {
    borderTop: '4px solid #000'
  }
}))

export default useStyles
