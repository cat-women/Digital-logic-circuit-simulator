import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAll, deleteResult, getResult } from '../../actions/result'

export default function Results(props) {
  const latestData = useSelector(state => state.results)
  const [results, setResults] = useState(latestData)

  useEffect(() => {
    setResults(latestData)
  }, [latestData])

  console.log("log in table", latestData);
  const handleDelete = (id) => {
    deleteResult(id).then(res => {
      alert(res.data.msg)
      let newResult = results.data?.filter(result => result._id !== id)
      setResults(newResult)


    }).catch(error => {
      alert("Delete failed")
    })

  }

  const clear = () => {
    deleteAll().then(res => {
      alert("Data removed")
      setResults({ data: [] })
    }).catch(error => {
      alert("Delete failed")
    })
  }

  if (results?.isLoading || !results?.data?.length) return

  return (
    <div >
      <Typography variant="h4">Your Solutions</Typography>
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
                    <>{item} </>
                  )}
                </TableCell>
                <TableCell align="right">
                  {JSON.parse(result.expression).exp}
                </TableCell>
                <TableCell align="right"> <Button sx={{ color: "red" }} onClick={(e) => handleDelete(result._id)}>Delete </Button></TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell align="right">
                <Button sx={{ color: "red" }} onClick={(e) => clear()}>Delete All
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
