import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import './App.css'
import TruthTable from './components/truthTable'
import Kmap from './components/Kmap'
import SideNavbar from './components/sideNavbar/SideNavbar.js'
import Home from './components/home/Home.js'

import useStyles from './styles'

function App() {
  const drawerWidth = 240

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const classes = useStyles()

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/** Header line  */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` }
          }}
        >
          <Toolbar>
            <TextField
              id="standard-basic"
              label="Expression"
              variant="standard"
            />
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
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
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
              <TruthTable />
            </Grid>
            <Grid item xs={6}>
              <Kmap />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default App
/**
 * make group in kmap done
 * make circuit base on expresion 
 */
