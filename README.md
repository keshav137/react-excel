# Excel/Google Sheets in React

[Demo](https://keshav137.github.io/react-excel/)

## Setup

1. Make sure node + npm is installed on your system.
2. Run `npm install` to install all the project dependencies.
3. Run `npm start` to start the build server and open the application

## Design

### Solution Summary

This solution presents a minimalist clone of Microsoft Excel implemented as a React Component using vanilla JavaScript and React Hooks. The core functionality includes creating a fixed-size grid of cells, displaying labels for each row and column, and allowing users to enter data into the cells. The entered data can be either simple strings or formulas that perform simple addition operations on other cells.

### State Management

The following pieces of state are tracked:

`grid`: This represents the state of the entire grid. Each cell in the grid can contain a string value, which can be either simple text or a formula starting with "=" sign.

`selected`: This represents the currently selected cell, if any.

The `useMemo` hook is used to create the initial state of the grid, ensuring that this operation is not unnecessarily repeated.

### Grid Generation

The grid state is initialized to be a 2D matrix with dimensions (ROWS + 1) x (COLUMNS + 1). This accounts for the additional row and column at the top and left for labels. ROWS and COLOUMNS are set to 15 each for this project.

### Cell Editing and Focus Management

The `handleOnChange` function is called whenever the user types into a cell. It updates the value of the corresponding cell in the grid state. It also handles deep cloning of the grid to ensure state immutability.

The `onFocus` and `onClick` handlers for each cell update the selected state to the currently focused cell.

### Formula Parsing

If a cell's value begins with "=", it's considered a formula. The `resolveValue` function handles parsing and calculation of these formulas. It only supports addition of cells referenced by their Excel-like notation (e.g., "A1+B2"). This formula will recursively resolve values of cells inside a formula string, if they are pointing to another cell containing a formula.

### Technical Decisions

1. Formula Parsing: Formula parsing is achieved using a simple string manipulation method, limiting the scope to ADD operations. The decision to implement a lightweight formula parser allows basic spreadsheet operations while keeping the codebase manageable.

2. Use of Material-UI: Leveraging Material-UI helps create a user-friendly interface without having to manage detailed CSS and UI components manually.

3. Focus Management: The selected cell is tracked in the state, allowing the component to handle cell focus changes appropriately and improve user interaction. When the user clicks outside the grid, `selected` is set to null.

### Potential Enhancements

1. Extend Formula Parsing: Extend formula parsing to include subtraction, multiplication, and division.

2. Error Handling: Implement error handling for invalid cell references or formulas.

3. Performance Optimization: Optimize performance for larger grid sizes using techniques like virtualization.

4. Resizable Grid: Allow users to add/remove rows and columns to resize the grid dynamically.

5. Cell Formatting: Add options to format cells (e.g., font, color, background).

6. Persistency: Implement persistency so that users can save their work and resume later.

7. Tests: Write unit and integration tests to ensure the functionality of the component.
