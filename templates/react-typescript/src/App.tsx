import { BrowserRouter } from "react-router-dom";

import { Navigation } from "./common";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main style={{ marginTop: "6.5rem" }}>Hello World!</main>
    </BrowserRouter>
  );
}

export default App;
    