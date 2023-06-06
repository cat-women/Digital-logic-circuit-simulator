import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import './App.css'

/** Components imports */
import TruthTable from './components/truthTable'
import Kmap from './components/Kmap'
import SideNavbar from './components/sideNavbar/SideNavbar.js'
import Home from './components/home/Home.js'
import SOP from './components/SOP.js'

import useStyles from './styles'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [variables, setvariables] = useState(['A', 'B', 'C'])
  const [expression, setExpression] = useState([1, 3, 7, 5])
  const [input, setInput] = useState([])
  const classes = useStyles()

  const drawerWidth = 240

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleNewExpression = e => {
    const value = e.target.value
    const newExpression = []
    for (let i = 0; i < value.length; i++) {
      const temp = value[i]
      if (temp === `,`) continue
      if (temp > 64 || temp < 0) alert('Enter valid number ')
      newExpression.push(temp)
    }
    setInput(newExpression)
  }
  const handlelExpression = () => {
    setExpression(input)
  }
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
            <TextField
              id="standard-basic"
              label="Expression"
              variant="standard"
              onChange={handleNewExpression}
            />
            <Button onClick={handlelExpression}>Solve</Button>
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
              <TruthTable variables={variables} expresion={expression} />
            </Grid>
            <Grid item xs={6}>
              <Kmap variables={variables} expresion={expression} />
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