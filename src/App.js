import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import './App.css'
import { useMethod } from './context'

/** Components imports */
import TruthTable from './components/truthTable'
import Kmap from './components/Kmap'
import SideNavbar from './components/sideNavbar/SideNavbar.js'
// import Diagram from './components/circuitDaigram.js'
import MaxtermDaigram from './components/maxtermCircuitDaigram.js'

import Form from './components/Form.js'
import useStyles from './styles'
import AuthModal from './components/auth/form'
import Result from './components/results'

import { signOut } from './actions/auth'
import { getResult, addResult } from './actions/result'

function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [variables, setvariables] = useState(['A', 'B'])
  const [expression, setExpression] = useState([0, 1])

  const { method, setMethod } = useMethod();

  const handleMethod = (value) => {
    setMethod(value)
  }

  const drawerWidth = 240
  const functionalExp = useSelector(state => state.funcExp)
  const [user, setUser] = useState(null)


  useEffect(() => {
    dispatch(getResult())
  })

  useEffect(() => {
    const loggedUser = JSON.parse(sessionStorage.getItem('user'))
    if (loggedUser)
      setUser(loggedUser)
  }, [])


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleExpression = newExp => {
    setExpression(newExp)
    if (user && functionalExp.exp.length) {
      addResult({ input: expression, expression: functionalExp })
    }
  }

  const handleVariable = newVariable => {
    setvariables(newVariable)
  }
  const handleSignout = () => {
    signOut()
    setUser(null)
  }




  if (expression.length > Math.pow(2, variables.length)) {
    alert('Expression length exceed for given variable')
  }
  return (
    <div className='App'>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/** Header line  */}
        <AppBar
          position='fixed'
          sx={{
            background: 'white',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` }
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form handleExpression={handleExpression} variables={variables} />
            <div>
              <InputLabel sx={{ marginLeft: '129px' }}>
                Expression :
              </InputLabel>

              <InputLabel sx={{ marginLeft: '129px', color: 'red' }}>
                {functionalExp.exp}{' '}
              </InputLabel>
            </div>
            {user
              ? <Typography sx={{ color: 'black' }}>
                Hello {user.data.username}{' '}
              </Typography>
              : <Typography sx={{ color: 'black' }}>
                Login to save your solution
              </Typography>}
            {user
              ? <Button onClick={() => handleSignout()}>Logout </Button>
              : <Button onClick={handleOpen}  >Login </Button>}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box className={classes.modalBox}>
                <AuthModal setOpen={setOpen} setUser={setUser} />
              </Box>
            </Modal>
          </Toolbar>
        </AppBar>

        {/** Sidenavbar */}
        <Box
          component='nav'
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label='mailbox folders'
        >
          <SideNavbar
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth
              }
            }}
            handleVariable={handleVariable}
          />
        </Box>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          <Toolbar />
          <Grid container style={{ marginLeft: '15px', padding: '20px' }}>
            <Button onClick={(e) => handleMethod('pos')} style={{ background: method === 'pos' ? 'green' : '', color: 'black' }}>Maxterm</Button>
            <Button onClick={(e) => handleMethod('sop')} style={{ background: method === 'sop' ? 'green' : '', color: 'black' }}>Minterm</Button>

          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TruthTable variables={variables} expression={expression} method="sop" />
            </Grid>
            <Grid item xs={6}>
              <Kmap variables={variables} expression={expression} method="sop" />
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: '90px' }} />
          <Grid container>
            <Grid item xs={8}>
              <Typography variant='h4'>Circuit</Typography>
              <MaxtermDaigram variables={variables} method='pos' />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={8}>
              <Result />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default App
