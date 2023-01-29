import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getInfo, getProposals, isWalletConnected } from "./Blockchain.services";
import CreateProposal from "./components/CreateProposal";
import Header from "./components/Header";
import Home from "./views/Home";
import Proposal from "./views/Proposal";

function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    isWalletConnected();
    getInfo();
    // getProposals();
    setLoaded(true);
  }, []);
  
  return (
    <BrowserRouter>
      <div
        className="min-h-screen text-gray-900 dark:text-gray-300
        dark:bg-[#212936] "
      >
        <Header />
        {loaded ? (
                  <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/proposal/:id" element={<Proposal />} />
                </Routes>
        ):null}
        <CreateProposal />
      </div>
    </BrowserRouter>
  );
}

export default App;
