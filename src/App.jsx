import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "@/components/header/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--background)] flex flex-col">
        <Header />
        <main className="flex-1 mt-[60px]">
          {" "}
          <p>NFT marketplace</p>
        </main>
      </div>
    </Router>
  );
}

export default App;
