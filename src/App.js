import logo from "./logo.svg";
import "./styles.scss";
import Excel from "./components/Excel";

const ROWS = 3;
const COLUMNS = 3;

function App() {
  return (
    <div className="App">
      <Excel rows={ROWS} columns={COLUMNS}></Excel>
    </div>
  );
}

export default App;
