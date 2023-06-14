import React, { useState } from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

export default function SideNavbar(props: Props) {
  const handleVariable = index => {
    switch (index) {
      case 0:
        props.handleVariable(['A', 'B'])
        break
      case 1:
        props.handleVariable(['A', 'B', 'C'])
        break
      case 2:
        props.handleVariable(['A', 'B', 'C', 'D'])
        break
      case 3:
        props.handleVariable(['A', 'B', 'C', 'D', 'E'])
        break
      case 4:
        props.handleVariable(['A', 'B', 'C', 'D', 'E', 'F'])
        break
      default:
        props.handleVariable(['A', 'B', 'C'])
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
