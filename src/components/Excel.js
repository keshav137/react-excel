import React, { useState, useMemo, useEffect } from "react";
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

  useEffect(() => {
    const onMouseClick = (e) => {
      if (e.target.closest(".grid")) return;
      setSelected(null);
    };

    document.addEventListener("click", onMouseClick);
    return () => {
      document.removeEventListener("click", onMouseClick);
    };
  }, []);

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

  // recursively resolve string value at grid[i][j]
  const resolveValue = (grid, i, j) => {
    let value = grid[i][j];
    if (value.length < 3 || value[0] != "=") {
      return value;
    }

    const elements = value.split("=")[1].split("+");
    let sum = 0;
    elements.forEach(function (element) {
      if (element == "0" || parseInt(element)) {
        sum += parseInt(element);
      } else {
        let x = parseInt(element.slice(1));
        let y = element.charCodeAt(0) - 64;

        let value = grid[x][y];
        if (value.length && value[0] == "=") {
          value = resolveValue(grid, x, y);
        }
        sum += parseInt(value);
      }
    });

    return sum;
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
        let value;
        if (selected && i == selected[0] && j == selected[1]) {
          value = grid[i][j];
        } else {
          value = resolveValue(grid, i, j);
        }

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
