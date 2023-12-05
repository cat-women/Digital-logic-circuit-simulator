import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
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
import MintermCircuitDaigram from './components/mintermCircuitDaigram.js'
import MaxtermDaigram from './components/maxtermCircuitDaigram.js'

import Form from './components/Form.js'
import useStyles from './styles'
import AuthModal from './components/auth/form'
import Result from './components/results'

import { signOut } from './actions/auth'

function App() {
  const { method, setMethod, variables, userExpression, user, setUser, booleanExpression, setUserHistory, setUserExpression } = useMethod();

  const classes = useStyles()
  const dispatch = useDispatch()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  setUserHistory(useSelector(state => state.results))

  const handleMethod = (value) => {
    setMethod(value)
  }
  const drawerWidth = 240


  useEffect(() => {
    const loggedUser = JSON.parse(sessionStorage.getItem('user'))
    if (loggedUser)
      setUser(loggedUser)
  }, [])


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSignout = () => {
    signOut()
    setUser(null)
  }

  if (userExpression.length > Math.pow(2, variables.length)) {
    alert('Expression length exceed for given variable')
    setUserExpression(['1', '2'])
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
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
            <Form />
            <div>
              <InputLabel sx={{ marginLeft: '129px' }}>
                Expression :
              </InputLabel>

              <InputLabel sx={{ marginLeft: '129px', color: 'red' }}>
                {booleanExpression}
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
                <AuthModal setOpen={setOpen} />
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
          <div className='main-container'>
            <Grid style={{ padding: '40px' }}>
              <Button onClick={(e) => handleMethod('pos')} style={{ background: method === 'pos' ? 'green' : 'gray', color: 'black', fontSize: 'large', padding: '10px', margin: '20px', width: '200px' }}>Maxterm</Button>
              <Button onClick={(e) => handleMethod('sop')} style={{ background: method === 'sop' ? 'green' : 'gray', color: 'black', fontSize: 'large', padding: '10px', margin: '20px', width: '200px' }}>Minterm</Button>

            </Grid>
            <Grid container className='container'>
              <Grid item xs={6}>
                <TruthTable className='components' />
                <Typography variant='h4' style={{ padding: '30px' }}>Truth Table</Typography>

              </Grid>
              <Grid item xs={6}>
                <Kmap className='components' />
                <Typography variant='h4' style={{ padding: '30px' }}>KMap</Typography>


              </Grid>
            </Grid>
            <Divider sx={{ marginTop: '90px' }} />
            <Grid className='container'>
              <Grid item xs={8} >
                <Typography variant='h3' style={{ padding: '30px' }}>Circuit</Typography>
                {method === 'sop' && <MintermCircuitDaigram />}
                {method === 'pos' && <MaxtermDaigram />}
              </Grid>
            </Grid>
            {user &&
              <Grid container className='container' >
                <Grid item xs={8}>
                  <Result />
                </Grid>
              </Grid>}
          </div>
        </Box>
      </Box>
    </div>
  )
}

export default App
