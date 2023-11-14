import React, { useState } from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { useMethod } from '../../context'

export default function SideNavbar() {
  const { setVariables } = useMethod()

  const handleVariable = index => {
    switch (index) {
      case 0:
        setVariables(['A', 'B'])
        break
      case 1:
        setVariables(['A', 'B', 'C'])
        break
      case 2:
        setVariables(['A', 'B', 'C', 'D'])
        break
      case 3:
        setVariables(['A', 'B', 'C', 'D', 'E'])
        break
      case 4:
        setVariables(['A', 'B', 'C', 'D', 'E', 'F'])
        break
      default:
        setVariables(['A', 'B'])
    }
  }

  return (
    <div>
      <Toolbar />
      <Divider />
      <List sx={{ position: 'fixed' }}>
        {[
          'Two Variable',
          'Three Variable',
          'Four Variable',
          'Five Variable',
          'Six Variable'
        ].map((text, index) =>
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleVariable(index)}
          >
            <ListItemButton>
              <ListItemIcon>
                <Button color="primary" />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  )
}
