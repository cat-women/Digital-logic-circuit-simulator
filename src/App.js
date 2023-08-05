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

import './App.css'
import Context from './context'

/** Components imports */
import TruthTable from './components/truthTable'
import Kmap from './components/Kmap'
import SideNavbar from './components/sideNavbar/SideNavbar.js'
import SOP from './components/SOP.js'
import Form from './components/Form.js'
import useStyles from './styles'
import AuthModal from './components/auth/form'
import Result from './components/results'

import { signOut } from './actions/auth'
import { getResult, addResult } from './actions/result'

function App () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [variables, setvariables] = useState(['A', 'B'])
  const [expression, setExpression] = useState([0, 1])
  const drawerWidth = 240
  const functionalExp = useSelector(state => state.funcExp)
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))

  let results = useSelector(state => state.results)

  useEffect(() => {
    dispatch(getResult())
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
      <Context.Provider value={{ user, setUser }}>
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
                : <Button onClick={handleOpen}>Login </Button>}

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
            <Grid container>
              <Grid item xs={6}>
                <TruthTable variables={variables} expression={expression} />
              </Grid>
              <Grid item xs={6}>
                <Kmap variables={variables} expression={expression} />
              </Grid>
            </Grid>
            <SOP variables={variables} />
            <Result results={results} />
          </Box>
        </Box>
      </Context.Provider>
    </div>
  )
}

export default App
