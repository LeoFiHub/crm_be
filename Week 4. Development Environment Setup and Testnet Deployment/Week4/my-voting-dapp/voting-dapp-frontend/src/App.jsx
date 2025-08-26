//import react
//tao function App()
  //const gom account va setAccount = useState
  // const connectWallet = async ()
    // if window.ethereum 
        // accounts = await window.ethereum.request voi method: eth_requestsAccounts
        // setAccount la accounts thu nhat (0)
    // else
      //alert thong bao chua cai dat metamask
  
  //return
    // <div className="p-4">
    //   <h1 className="text-2xl">Voting dApp</h1>
    //   <button className="bg-blue-500 text-white p-2 rounded" onClick={connectWallet}>
    //     {account ? `Connected: ${account.slice(0, 6)}...` : "Connect MetaMask"}
    //   </button>
    // </div>

//export default App;

import { useState, useEffect } from "react";
function App() {
  const [account, setAccount] = useState("");

  // Kiểm tra kết nối khi load trang
  useEffect(() => {
    const checkConnected = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };
    checkConnected();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        if (accounts.length === 0) {
          alert("No active wallet found. Please unlock MetaMask and try again.");
        } else {
          setAccount(accounts[0]);
        }
      } catch (error) {
        if (error.code === 4001) {
          alert("Connection request was rejected.");
        } else {
          alert(error.message || "An error occurred while connecting to MetaMask.");
        }
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Voting dApp</h1>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={connectWallet}>
        {account ? `Connected: ${account.slice(0, 6)}...` : "Connect MetaMask"}
      </button>
    </div>
  );
}
export default App;
