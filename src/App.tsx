import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Parent from "./pages/Parent";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Parent />
    </div>
  );
}

export default App;
