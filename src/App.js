import logo from "./logo.svg";
import "./styles.scss";
import Excel from "./components/Excel";

const ROWS = 15;
const COLUMNS = 15;

function App() {
  return (
    <div className="App">
      <Excel rows={ROWS} columns={COLUMNS}></Excel>
    </div>
  );
}

export default App;
