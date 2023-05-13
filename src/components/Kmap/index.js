import React from "react";
import useStyles from "./styles";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Kmap(props) {
  const classes = useStyles();
  let row = props.row;
  let col = props.col;
  let positionalArray = [];
  let kMapValue = [];
  let inputArray = [2, 3, 5];
  let variableCount = 3;
  let variables = ["A", "B", "C"];
  let verticleElement = variables.slice(0, Math.floor(variables.length / 2));
  let horizontalElement = variables.slice(Math.floor(variables.length / 2));

  let verticleElementBitSize = Math.pow(2, verticleElement.length);
  let horizontalElementBitSize = Math.pow(2, horizontalElement.length);

  const tableSize = Math.pow(2, variableCount);

  // decimal to binary conversion
  function toBinary(decimalNumber) {
    return decimalNumber.toString(2).padStart(variableCount, "0");
  }
  // binary to gray code
  function binaryToGray(binary) {
    let gray = "";
    gray += binary[0];
    for (let i = 1; i < binary.length; i++) {
      gray += binary[i - 1] ^ binary[i];
    }
    return gray;
  }

  // get kmap positional array
  function getKmapPositionalArray(tableSize) {
    for (let i = 0; i < tableSize; i++) {
      let graycode = binaryToGray(toBinary(i));
      positionalArray.push(parseInt(graycode, 2));
    }
  }

  // functional output
  let kmapIndex = 0;
  for (let j = 0; j < verticleElementBitSize; j++) {
    kMapValue[j] = [];
    for (let i = 0; i < tableSize / 2; i++) {
      inputArray.includes(kmapIndex)
        ? kMapValue[j].push(1)
        : kMapValue[j].push(0);
      kmapIndex++;
    }
  }
  return (
    <table border="1" className={classes.table}>
      <thead>
        <tr>
          <th />
          <th colSpan="5">
            {horizontalElement.map(key => key)}
          </th>
        </tr>
        <tr>
          <th />
          <th />
          <th>00</th>
          <th>01</th>
          <th>11</th>
          <th>10</th>
        </tr>
      </thead>
      <tbody>
        {horizontalElement.map((key, index) => {
          return (
            <tr key={index}>
              <td className={classes.td}>
                {verticleElement[index]}
              </td>
              <th className={classes.td}>
                {index}
              </th>

              {kMapValue[index].map((value, subIndex) => {
                return (
                  <td className={classes.td} key={subIndex}>
                    {kMapValue[index][subIndex]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
