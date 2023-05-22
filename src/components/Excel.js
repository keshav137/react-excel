import React, { useState, useEffect, useMemo, useRef } from "react";
import { TextField } from "@mui/material";

const ROWS = 15;
const COLUMNS = 15;

const Excel = () => {
  const initialGrid = useMemo(() => {
    let matrix = [];
    for (var i = 0; i < ROWS + 1; i++) {
      matrix.push([]);
      for (var j = 0; j < COLUMNS + 1; j++) {
        matrix[i].push("");
      }
    }
    return matrix;
  }, []);

  const [grid, setGrid] = useState(initialGrid);
  const [selected, setSelected] = useState(null);

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
    const y = notation.charCodeAt(0) - 64;
    return parseInt(grid[x][y]);
  };

  const resolveValue = (value, i, j) => {
    if (isSelected(i, j) || value.length < 3 || value[0] != "=") {
      return value;
    }

    const elements = value.split("=")[1].split("+");
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

      if (i == 0 && j == 0) {
        entry = (
          <TextField className="cell label-cell" variant="outlined" disabled />
        );
      } else if (j == 0) {
        entry = (
          <TextField
            className="cell label-cell"
            value={columnLabel}
            variant="outlined"
            disabled
          />
        );
      } else if (i == 0) {
        entry = (
          <TextField
            className="cell label-cell"
            value={rowLabel}
            variant="outlined"
            disabled
          />
        );
      } else {
        let value = grid[i][j];
        value = resolveValue(value, i, j);

        entry = (
          <TextField
            className="cell input-cell"
            variant="outlined"
            value={value}
            onFocus={() => {
              setSelected([i, j]);
            }}
            onClick={() => {
              setSelected([i, j]);
            }}
            onChange={(event) => handleOnChange(event, i, j)}
          />
        );
      }

      matrixRow.push(<div className="cell-parent">{entry}</div>);
    }
    matrix.push(<div className="row">{matrixRow}</div>);
  }

  return <div className="grid">{matrix}</div>;
};

export default Excel;
