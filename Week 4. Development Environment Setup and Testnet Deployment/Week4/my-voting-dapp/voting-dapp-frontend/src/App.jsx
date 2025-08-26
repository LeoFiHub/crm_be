//==================KET NOI VOI METAMASK==========================
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

// import { useState, useEffect } from "react";
// function App() {
//   const [account, setAccount] = useState("");

//   // Kiểm tra kết nối khi load trang
//   useEffect(() => {
//     const checkConnected = async () => {
//       if (window.ethereum) {
//         const accounts = await window.ethereum.request({ method: "eth_accounts" });
//         if (accounts.length > 0) {
//           setAccount(accounts[0]);
//         }
//       }
//     };
//     checkConnected();
//   }, []);

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts"
//         });
//         if (accounts.length === 0) {
//           alert("No active wallet found. Please unlock MetaMask and try again.");
//         } else {
//           setAccount(accounts[0]);
//         }
//       } catch (error) {
//         if (error.code === 4001) {
//           alert("Connection request was rejected.");
//         } else {
//           alert(error.message || "An error occurred while connecting to MetaMask.");
//         }
//       }
//     } else {
//       alert("MetaMask is not installed!");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl">Voting dApp</h1>
//       <button className="bg-blue-500 text-white p-2 rounded" onClick={connectWallet}>
//         {account ? `Connected: ${account.slice(0, 6)}...` : "Connect MetaMask"}
//       </button>
//     </div>
//   );
// }
// export default App;
//============DOC CANDIDATE TU CONTRACT VOTING============
// import { request } from "express"
// import usestate,useeffect in react 
// import ethers
// contract_address
// import { useEffect } from "react"
// abi

// App
//   account, setAccount = useState("")
//   candidates, setCandidates = useState([])
//   connectWallet = async
//     if window.ethereum => accounts = request({ method: "eth_requestAccounts" })
//     else => "MetaMask is not installed"

//   loadCandidates = async
//     provider = ethers.providers.Web3Provider(window.ethereum)
//     contract = ethers.Contract(contract_address, abi, provider)
//     candidatesList = []
//     for i = 0 -> count 
//       candidate = contract.candidates(i)
//       candidatesList.push({ name: candidate[0], voteCount: candidate[1].toString() })
//     setCandidates(candidatesList)
//   useEffect(() => { if (account) loadCandidates(); }, [account]);
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl">Voting dApp</h1>
//       <button className="bg-blue-500 text-white p-2 rounded" onClick={connectWallet}>
//         {account ? `Connected: ${account.slice(0, 6)}...` : "Connect MetaMask"}
//       </button>
//       <ul className="mt-4">
//         {candidates.map((c, i) => (
//           <li key={i}>{c.name}: {c.voteCount} votes</li>
//         ))}
//       </ul>
//     </div>
//   );
// export default App;

// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// const contractAddress = "0xff3F736Bd27A5386ecAfF6a05D6609B399a49c1C"; // Thay bằng địa chỉ từ Tuần 4
// const abi = [
//   "function candidateCount() view returns (uint)",
//   "function candidates(uint) view returns (string, uint)"
// ];
// function App() {
//   const [account, setAccount] = useState("");
//   const [candidates, setCandidates] = useState([]);
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//       setAccount(accounts[0]);
//     }
//   };
//   const loadCandidates = async () => {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const contract = new ethers.Contract(contractAddress, abi, provider);
//     const count = await contract.candidateCount();
//     const candidatesList = [];
//     for (let i = 0; i < count; i++) {
//       const candidate = await contract.candidates(i);
//       candidatesList.push({ name: candidate[0], voteCount: candidate[1].toString() });
//     }
//     setCandidates(candidatesList);
//   };
//   useEffect(() => { if (account) loadCandidates(); }, [account]);
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl">Voting dApp</h1>
//       <button className="bg-blue-500 text-white p-2 rounded" onClick={connectWallet}>
//         {account ? `Connected: ${account.slice(0, 6)}...` : "Connect MetaMask"}
//       </button>
//       <ul className="mt-4">
//         {candidates.map((c, i) => (
//           <li key={i}>{c.name}: {c.voteCount} votes</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default App;


//==================GUI TRANSACTION===================
// import { ethers } from "ethers";
// import { useEffect, useState } from "react";
// const contractAddress = "0xff3F736Bd27A5386ecAfF6a05D6609B399a49c1C";
// const abi = [
//   "function candidateCount() view returns (uint)",
//   "function candidates(uint) view returns (string, uint)",
//   "function vote(uint _candidateId) public"
// ];
// function App() {
//   const [account, setAccount] = useState("");
//   const [candidates, setCandidates] = useState([]);
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//       setAccount(accounts[0]);
//     }
//   };
//   const loadCandidates = async () => {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const contract = new ethers.Contract(contractAddress, abi, provider);
//     const count = await contract.candidateCount();
//     const candidatesList = [];
//     for (let i = 0; i < count; i++) {
//       const candidate = await contract.candidates(i);
//       candidatesList.push({ name: candidate[0], voteCount: candidate[1].toString() });
//     }
//     setCandidates(candidatesList);
//   };
//   const vote = async (candidateId) => {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, abi, signer);
//     const tx = await contract.vote(candidateId);
//     await tx.wait();
//     loadCandidates(); // Cập nhật danh sách
//   };
//   useEffect(() => { if (account) loadCandidates(); }, [account]);
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl">Voting dApp</h1>
//       <button className="bg-blue-500 text-white p-2 rounded" onClick={connectWallet}>
//         {account ? `Connected: ${account.slice(0, 6)}...` : "Connect MetaMask"}
//       </button>
//       <ul className="mt-4">
//         {candidates.map((c, i) => (
//           <li key={i} className="my-2">
//             {c.name}: {c.voteCount} votes
//             <button className="ml-2 bg-green-500 text-white p-1 rounded" onClick={() => vote(i)}>
//               Vote
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default App;
//============TOI UU LOANDING VA ERROR HANDLING===================
import { ethers } from "ethers";
import { useEffect, useState } from "react";
const contractAddress = "0xff3F736Bd27A5386ecAfF6a05D6609B399a49c1C";
const abi = [
  "function candidateCount() view returns (uint)",
  "function candidates(uint) view returns (string, uint)",
  "function vote(uint _candidateId) public"
];
function App() {
  const [account, setAccount] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      setError("Please install MetaMask!");
    }
  };
  const loadCandidates = async () => {
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const count = await contract.candidateCount();
      const candidatesList = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.candidates(i);
        candidatesList.push({ name: candidate[0], voteCount: candidate[1].toString() });
      }
      setCandidates(candidatesList);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  const vote = async (candidateId) => {
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.vote(candidateId);
      await tx.wait();
      loadCandidates();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  useEffect(() => { if (account) loadCandidates(); }, [account]);
  return (
    <div className="p-4">
      <h1 className="text-2xl">Voting dApp</h1>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={connectWallet}>
        {account ? `Connected: ${account.slice(0, 6)}...` : "Connect MetaMask"}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-4">
        {candidates.map((c, i) => (
          <li key={i} className="my-2">
            {c.name}: {c.voteCount} votes
            <button className="ml-2 bg-green-500 text-white p-1 rounded" onClick={() => vote(i)}>
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;