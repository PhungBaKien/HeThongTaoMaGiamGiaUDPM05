import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SellNftPage = () => {
  const { nftId } = useParams();  // Lấy nftId từ URL params
  const [price, setPrice] = useState('');
  const [nft, setNft] = useState(null);
  const [confirmationLink, setConfirmationLink] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nftId) {
      setError('Invalid NFT ID');
      return;
    }

    const fetchNft = async () => {
      try {
        const url = `https://api.gameshift.dev/nx/items/${nftId}`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',  // Đảm bảo API Key đúng
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data); // Thêm log để kiểm tra dữ liệu nhận được từ API

        if (data && data.item) {
          setNft(data.item);
        } else {
          setError('NFT not found');
        }
      } catch (err) {
        setError('An error occurred while fetching NFT details');
        console.error(err);
      }
    };

    fetchNft();
  }, [nftId]);

  const handleSell = async () => {
    if (!price) {
      setError('Price is required');
      return;
    }

    try {
      const url = `https://api.gameshift.dev/nx/unique-assets/${nftId}/list-for-sale`;
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',  // Đảm bảo API Key đúng
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          price: { currencyId: 'USDC', naturalAmount: price },
        }),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data); // Thêm log để kiểm tra dữ liệu trả về từ API

      if (data.consentUrl) {
        setConfirmationLink(data.consentUrl);
        setError(null);
      } else {
        setError('Failed to create sale link');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      {error && <p style={styles.error}>{error}</p>}
      {nft ? (
        <div style={styles.nftDetails}>
          <h1>Sell Your NFT</h1>
          <img src={nft.imageUrl} alt={nft.name} style={styles.nftImage} />
          <h2>{nft.name}</h2>
          <p>{nft.description || 'No description available'}</p>
          <label>
            Price (USDC):
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={styles.input}
            />
          </label>
          <button onClick={handleSell} style={styles.sellButton}>
            Sell
          </button>

          {confirmationLink && (
            <div style={styles.confirmation}>
              <p>Click the link below to confirm your sale:</p>
              <a href={confirmationLink} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Confirm Sale
              </a>
            </div>
          )}
        </div>
      ) : (
        <div style={styles.loading}>
          <p>Loading NFT details...</p>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    textAlign: 'center',
  },
  nftDetails: {
    maxWidth: '600px',
    width: '100%',
  },
  nftImage: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginTop: '10px',
    width: '200px',
    marginBottom: '20px',
  },
  sellButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  confirmation: {
    marginTop: '20px',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  loading: {
    fontSize: '18px',
    color: '#888',
  },
};

export default SellNftPage;
