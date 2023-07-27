import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import { useSelector } from 'react-redux'
import { deleteAll, deleteResult} from '../../actions/result'

export default function Results() {
  const results = useSelector(state => state.results)
    const handleDelete =(id) =>{
        const res = deleteResult(id)
        console.log("delete",res);
    }
  if (results.isLoading) return

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 550 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Input</TableCell>
            <TableCell align="right">Expression</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.data.map((result, index) =>
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="right">
                {JSON.parse(result.input).map(item =>
                  <>{item  } </>
                )}
              </TableCell>
              <TableCell align="right">
                {JSON.parse(result.expression).exp}
              </TableCell>
              <TableCell align="right"> <Button sx={{color:"red"} } onClick={(e)=>handleDelete(result._id)}>Delete </Button></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
