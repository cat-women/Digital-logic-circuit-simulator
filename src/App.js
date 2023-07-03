import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import './App.css'

/** Components imports */
import TruthTable from './components/truthTable'
import Kmap from './components/Kmap'
import SideNavbar from './components/sideNavbar/SideNavbar.js'
import SOP from './components/SOP.js'
import Form from './components/Form.js'
import useStyles from './styles'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [variables, setvariables] = useState(['A', 'B', 'C', 'D','E'])
  const [expression, setExpression] = useState([1,2,3])
  const classes = useStyles()
  const drawerWidth = 240
  const functionalExp = useSelector(state => state.funcExp)
  console.log("expression",functionalExp.exp);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleExpression = newExp => {
    setExpression(newExp)
  }

  const handleVariable = newVariable => {
    setvariables(newVariable)
  }
  if (expression.length > Math.pow(2, variables.length))
    alert('Expression length exceed for given variable')
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/** Header line  */}
        <AppBar
          position="fixed"
          sx={{
            background: 'white',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` }
          }}
        >
          <Toolbar>
            <Form handleExpression={handleExpression} variables={variables} />
            <InputLabel sx={{ marginLeft: '129px' }}>Expression :</InputLabel>

            <InputLabel sx={{ marginLeft: '129px', color: 'red' }}>
              {functionalExp.exp}{' '}
            </InputLabel>
          </Toolbar>
        </AppBar>

        {/** Sidenavbar */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <SideNavbar
            variant="temporary"
            open={
              mobileOpen // container={container}
            }
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true } // Better open performance on mobile.
            }
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
          component="main"
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

          {/* <Project /> */}
        </Box>
      </Box>
    </div>
  )
}

export default App
