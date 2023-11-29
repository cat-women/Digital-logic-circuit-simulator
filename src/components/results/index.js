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
import { useMethod } from '../../context'

export default function Results() {
  const { userHistory, setUserHistory } = useMethod()
  console.log("user data", userHistory);
  const dispatch = useDispatch()
  let results = userHistory
  useEffect(() => {
    dispatch(getResult())
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteResult(id))

  }

  const clear = () => {
    const result = window.confirm('Do you want to proceed?');
    if (result) {
      dispatch(deleteAll())
      return
    }
    return
  }
  if (userHistory?.isLoading || !userHistory?.data?.length) return (
    <Typography>Date does not exist </Typography>
  )

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
            {userHistory.data.map((result, index) =>
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
                  {JSON.parse(result.expression)}
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
