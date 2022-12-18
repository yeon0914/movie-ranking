import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("api")
      .then((res) => res.json())
      .then((data) => setUsername(data.username));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {username ? `Hello ${username}` : "Hello World"}
      </header>
    </div>
  );
}

export default App;
