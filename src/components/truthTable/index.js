import React from "react";
import useStyles from "./styles";

export default function TruthTable(props) {
  const classes = useStyles();

  const variableCount = 3;
  const truthTable = [];
  const variables = ["A", "B", "C"];
  let expression = [2, 3, 5];
  let functionalValue = [];
  const tableSize = Math.pow(2, variableCount);

  // truth table values
  for (let i = 0; i < tableSize; i++) {
    truthTable.push(i);
    // functional value
    expression.includes(i) ? functionalValue.push(1) : functionalValue.push(0);
  }

  // decimal to binary conversion
  function toBinary(decimalNumber) {
    return decimalNumber.toString(2).padStart(variableCount, "0");
  }

  return (
    <div>
      <table border="1" className={classes.table}>
        <thead>
          <tr>
            {variables.map(variable =>
              <th key={variable}>
                {variable}
              </th>
            )}
            <th>F</th>
          </tr>
        </thead>
        <tbody>
          {truthTable.map((decimalNumber, index) => {
            const binary = toBinary(decimalNumber);
            return (
              <tr key={decimalNumber}>
                {binary.split("").map((bit, index) =>
                  <td key={index} className={classes.td}>
                    {bit}
                  </td>
                )}
                <td key={index} className={classes.td}>
                  {functionalValue[index]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
