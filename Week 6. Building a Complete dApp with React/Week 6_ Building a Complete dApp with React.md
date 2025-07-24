

# Giáo trình Tuần 6: Xây dựng dApp hoàn chỉnh với React (30 phút/ngày)

## Mục tiêu
- Cài đặt React và ethers.js để xây dựng giao diện dApp.
- Tạo giao diện React tương tác với contract Voting (hiển thị candidate, gửi vote).
- Tích hợp MetaMask để người dùng tương tác qua trình duyệt.
- Deploy dApp lên Vercel.

## Lịch trình học (7 ngày, 30 phút/ngày)

### Ngày 1: Cài đặt React và Tailwind CSS
**Mục tiêu**: Thiết lập dự án React.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “React Basics” ([Webisoft](https://webisoft.com/articles/how-to-create-a-smart-contract/)). React là thư viện để xây dựng giao diện.  
- **Thực hành (25 phút)**:  
  - Trong thư mục `my-voting-dapp`, tạo dự án React: `npx create-react-app voting-dapp-frontend`.  
  - Cài Tailwind CSS: Theo hướng dẫn ([Tailwind CSS](https://tailwindcss.com/docs/guides/create-react-app)).  
  - Cài ethers.js: `npm install ethers`.  
  - Chạy dự án: `cd voting-dapp-frontend && npm start`, mở `http://localhost:3000`.  
**Kết quả**: Dự án React hoạt động, sẵn sàng tích hợp contract.  

---

### Ngày 2: Kết nối MetaMask với React
**Mục tiêu**: Tích hợp MetaMask để lấy tài khoản người dùng.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Connecting to MetaMask” ([Alchemy](https://www.alchemy.com/overviews/learn-solidity)). MetaMask cung cấp provider để tương tác blockchain.  
- **Thực hành (25 phút)**: Trong `src/App.js`, thêm code kết nối MetaMask:  
  ```javascript
  import { useState } from "react";
  function App() {
    const [account, setAccount] = useState("");
    const connectWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask!");
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
  ```
  Chạy `npm start`, nhấp “Connect MetaMask”, kiểm tra tài khoản hiển thị.  
**Kết quả**: Giao diện React kết nối được MetaMask.  

---

### Ngày 3: Đọc candidate từ contract Voting
**Mục tiêu**: Hiển thị danh sách candidate từ contract.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Ôn lại ethers.js ([QuickNode](https://www.quicknode.com/guides/ethereum-development/smart-contracts/an-overview-of-how-smart-contracts-work-on-ethereum)).  
- **Thực hành (25 phút)**: Sửa `src/App.js`:  
  ```javascript
  import { useState, useEffect } from "react";
  import { ethers } from "ethers";
  const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Thay bằng địa chỉ từ Tuần 4
  const abi = [
    "function candidateCount() view returns (uint)",
    "function candidates(uint) view returns (string, uint)"
  ];
  function App() {
    const [account, setAccount] = useState("");
    const [candidates, setCandidates] = useState([]);
    const connectWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      }
    };
    const loadCandidates = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const count = await contract.candidateCount();
      const candidatesList = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.candidates(i);
        candidatesList.push({ name: candidate[0], voteCount: candidate[1].toString() });
      }
      setCandidates(candidatesList);
    };
    useEffect(() => { if (account) loadCandidates(); }, [account]);
    return (
      <div className="p-4">
        <h1 className="text-2xl">Voting dApp</h1>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={connectWallet}>
          {account ? `Connected: ${account.slice(0, 6)}...` : "Connect MetaMask"}
        </button>
        <ul className="mt-4">
          {candidates.map((c, i) => (
            <li key={i}>{c.name}: {c.voteCount} votes</li>
          ))}
        </ul>
      </div>
    );
  }
  export default App;
  ```
  Chạy `npm start`, kết nối MetaMask, kiểm tra danh sách candidate.  
**Kết quả**: Hiển thị danh sách candidate từ contract.  

---

### Ngày 4: Gửi vote từ giao diện
**Mục tiêu**: Thêm chức năng vote qua giao diện.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Writing to Contracts” ([Alchemy](https://www.alchemy.com/overviews/learn-solidity)). Dùng signer để gửi transaction.  
- **Thực hành (25 phút)**: Sửa `src/App.js`:  
  ```javascript
  import { useState, useEffect } from "react";
  import { ethers } from "ethers";
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const abi = [
    "function candidateCount() view returns (uint)",
    "function candidates(uint) view returns (string, uint)",
    "function vote(uint _candidateId) public"
  ];
  function App() {
    const [account, setAccount] = useState("");
    const [candidates, setCandidates] = useState([]);
    const connectWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      }
    };
    const loadCandidates = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const count = await contract.candidateCount();
      const candidatesList = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.candidates(i);
        candidatesList.push({ name: candidate[0], voteCount: candidate[1].toString() });
      }
      setCandidates(candidatesList);
    };
    const vote = async (candidateId) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.vote(candidateId);
      await tx.wait();
      loadCandidates(); // Cập nhật danh sách
    };
    useEffect(() => { if (account) loadCandidates(); }, [account]);
    return (
      <div className="p-4">
        <h1 className="text-2xl">Voting dApp</h1>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={connectWallet}>
          {account ? `Connected: ${account.slice(0, 6)}...` : "Connect MetaMask"}
        </button>
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
  ```
  Chạy `npm start`, vote cho candidate, kiểm tra MetaMask và Etherscan.  
**Kết quả**: Giao diện cho phép vote qua MetaMask.  

---

### Ngày 5: Tối ưu UX (Loading và lỗi)
**Mục tiêu**: Thêm loading state và xử lý lỗi.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Error Handling” ([Webisoft](https://webisoft.com/articles/how-to-create-a-smart-contract/)).  
- **Thực hành (25 phút)**: Sửa `src/App.js`:  
  ```javascript
  import { useState, useEffect } from "react";
  import { ethers } from "ethers";
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
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
  ```
  Chạy `npm start`, thử vote với candidate không hợp lệ, kiểm tra thông báo lỗi.  
**Kết quả**: Giao diện hiển thị loading và lỗi khi vote.  

---

### Ngày 6: Deploy dApp lên Vercel
**Mục tiêu**: Triển khai dApp lên Vercel.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Đọc “Deploying to Vercel” ([Vercel Docs](https://vercel.com/docs)). Vercel host ứng dụng React.  
- **Thực hành (25 phút)**:  
  - Đăng ký tài khoản Vercel ([Vercel](https://vercel.com)).  
  - Cài Vercel CLI: `npm install -g vercel`.  
  - Trong thư mục `voting-dapp-frontend`, chạy: `vercel`. Theo hướng dẫn để deploy.  
  - Truy cập URL Vercel cung cấp, kết nối MetaMask, kiểm tra dApp.  
**Kết quả**: dApp Voting hoạt động trên Vercel.  

---

### Ngày 7: Ôn tập và kiểm tra dApp
**Mục tiêu**: Kiểm tra và cải thiện dApp.  
**Hoạt động (30 phút)**:  
- **Lý thuyết (5 phút)**: Ôn lại React và ethers.js ([Alchemy](https://www.alchemy.com/overviews/learn-solidity)).  
- **Thực hành (25 phút)**:  
  - Truy cập dApp trên Vercel, kết nối MetaMask (Sepolia), thêm candidate (nếu là owner), vote, kiểm tra cập nhật.  
  - Kiểm tra transaction trên [Sepolia Etherscan](https://sepolia.etherscan.io/).  
  - Cải thiện UI: Thêm CSS Tailwind (VD: màu nền, padding) nếu còn thời gian.  
**Kết quả**: dApp hoàn chỉnh, hoạt động ổn định trên Vercel.  

---

## Bài tập cuối tuần
1. Viết đoạn ngắn (100 từ):  
   - React và ethers.js giúp xây dựng dApp như thế nào?  
   - MetaMask đóng vai trò gì trong dApp?  
2. Deploy dApp lên Vercel, lưu URL, kiểm tra vote trên [Sepolia Etherscan](https://sepolia.etherscan.io/).  
3. Chụp ảnh màn hình dApp chạy trên Vercel với MetaMask kết nối.  

## Kết quả mong đợi
- Xây dựng dApp Voting với giao diện React, tích hợp MetaMask.  
- Hiển thị danh sách candidate, hỗ trợ vote, xử lý loading/lỗi.  
- Deploy dApp lên Vercel, hoạt động ổn định.  

## Tài liệu tham khảo
- [Webisoft: Create a Smart Contract](https://webisoft.com/articles/how-to-create-a-smart-contract/)  
- [Alchemy: Learn Solidity](https://www.alchemy.com/overviews/learn-solidity)  
- [Vercel Docs](https://vercel.com/docs)  
- [Sepolia Etherscan](https://sepolia.etherscan.io/)  

