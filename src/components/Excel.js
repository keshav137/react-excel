import React, { useState, useEffect, useMemo, useRef } from "react";
import { TextField, Button } from "@mui/material";

const Excel = ({ rows, columns }) => {
  let initialGrid = useMemo(() => {
    let matrix = [];
    for (var i = 0; i < rows + 1; i++) {
      matrix.push([]);
      for (var j = 0; j < columns + 1; j++) {
        matrix[i].push("");
      }
    }
    return matrix;
  }, [rows, columns]);

  const [grid, setGrid] = useState(initialGrid);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  const handleOnChange = (event, i, j) => {
    grid[i][j] = event.target.value;

    // deep copy the grid
    let updatedGrid = [];
    for (var i = 0; i < grid.length; i++) {
      updatedGrid.push([]);
      for (var j = 0; j < grid[i].length; j++) {
        updatedGrid[i].push(grid[i][j]);
      }
    }
    setGrid(updatedGrid);
  };

  const getValueFromExcelNotation = (notation) => {
    const x = parseInt(notation[1]);
    const y = parseInt(notation.charCodeAt(0)) - 64;
    return parseInt(grid[x][y]);
  };

  const resolveValue = (value, i, j) => {
    // improve this check
    if (isSelected(i, j) || value.length < 6 || value[0] != "=") {
      return value;
    }

    let elements = value.split("=")[1].split("+");
    let sum = 0;
    elements.forEach(function (element) {
      sum += getValueFromExcelNotation(element);
    });

    return sum;
  };

  const isSelected = (i, j) => {
    if (!selected) {
      return false;
    }
    return i == selected[0] && j == selected[1];
  };

  let matrix = [];
  for (let i = 0; i < grid.length; i++) {
    let matrixRow = [];
    for (let j = 0; j < grid[i].length; j++) {
      let rowLabel = String.fromCharCode(96 + j).toUpperCase();
      let columnLabel = String(i);
      let entry;
      if (i == 0) {
        entry = (
          <TextField label={rowLabel} variant="outlined" disabled={true} />
        );
      } else if (j == 0) {
        entry = (
          <TextField label={columnLabel} variant="outlined" disabled={true} />
        );
      } else {
        let value = grid[i][j];
        value = resolveValue(value, i, j);

        entry = (
          <TextField
            variant="outlined"
            value={value}
            onClick={() => {
              setSelected([i, j]);
            }}
            onChange={(event) => handleOnChange(event, i, j)}
          />
        );
      }
      matrixRow.push(entry);
    }
    matrix.push(<div>{matrixRow}</div>);
  }

  return <div>{matrix}</div>;
};

export default Excel;
