import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// CSS Tùy chỉnh gộp vào trong React Component
const PhantomConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  const connectPhantomWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        checkUser(response.publicKey.toString());
      } catch (error) {
        setErrorMessage("Failed to connect Phantom Wallet.");
        console.error(error);
      }
    } else {
      setErrorMessage("Phantom Wallet is not installed.");
    }
  };

  const checkUser = async (address) => {
    setIsChecking(true);
    const url = `https://api.gameshift.dev/nx/users/${address}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key":
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log("User found:", data);
        navigate("/manage-nft"); // Chuyển hướng nếu người dùng tồn tại
      } else if (response.status === 400) {
        console.log("User not found. Showing registration form.");
        setShowRegisterForm(true); // Hiển thị form đăng ký nếu người dùng không tồn tại
      } else {
        throw new Error("Unexpected error.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setErrorMessage("Failed to fetch user.");
      setShowRegisterForm(true); // Hiển thị form đăng ký khi có lỗi
    } finally {
      setIsChecking(false);
    }
  };

  const registerUser = async () => {
    const url = "https://api.gameshift.dev/nx/users";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key":
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
      },
      body: JSON.stringify({
        referenceId: walletAddress,
        email: email,
        externalWalletAddress: walletAddress,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        console.log("User registered:", data);
        navigate("/nft-to-buy"); // Chuyển hướng sau khi đăng ký thành công
      } else {
        setErrorMessage(data.message || "Failed to register user.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("Failed to register user.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Phantom Wallet Connection</h2>
      {!walletAddress ? (
        <button className="btn-connect" onClick={connectPhantomWallet}>
          Connect Phantom Wallet
        </button>
      ) : (
        <p className="wallet-address">Wallet Address: {walletAddress}</p>
      )}
      {isChecking && <p className="checking-status">Checking user...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {showRegisterForm && (
        <div className="register-form">
          <h3>Register User</h3>
          <p>Wallet Address: {walletAddress}</p>
          <input
            type="email"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button className="btn-register" onClick={registerUser}>
            Register
          </button>
        </div>
      )}

      <style jsx>{`
        /* Các kiểu cho container */
        .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 30px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Tiêu đề chính */
        .title {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
        }

        /* Nút kết nối ví Phantom */
        .btn-connect {
          width: 100%;
          padding: 15px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-connect:hover {
          background-color: #0056b3;
        }

        /* Đoạn văn bản địa chỉ ví */
        .wallet-address {
          text-align: center;
          font-size: 16px;
          color: #28a745;
          margin-top: 20px;
        }

        /* Trạng thái kiểm tra người dùng */
        .checking-status {
          text-align: center;
          font-size: 16px;
          color: #6c757d;
          margin-top: 10px;
        }

        /* Thông báo lỗi */
        .error-message {
          text-align: center;
          font-size: 16px;
          color: red;
          margin-top: 10px;
        }

        /* Form đăng ký */
        .register-form {
          margin-top: 20px;
          padding: 20px;
          background-color: #ffffff;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .register-form h3 {
          text-align: center;
          margin-bottom: 20px;
        }

        .email-input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .btn-register {
          width: 100%;
          padding: 15px;
          font-size: 16px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-register:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default PhantomConnect;
