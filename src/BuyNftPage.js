import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const BuyNftPage = () => {
  const { nftId } = useParams(); // Lấy nftId từ URL params
  const [price, setPrice] = useState('');
  const [nft, setNft] = useState(null);
  const [buyerId, setBuyerId] = useState(''); // Thêm state để lưu buyerId
  const [confirmationLink, setConfirmationLink] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nftId) {
      setError('Invalid NFT ID');
      setLoading(false);
      return;
    }

    const fetchNft = async () => {
      try {
        const url = `https://api.gameshift.dev/nx/items/${nftId}`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        if (data && data.item) {
          setNft(data.item);
        } else {
          setError('NFT not found');
        }
      } catch (err) {
        setError('An error occurred while fetching NFT details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNft();
  }, [nftId]);

  const handleBuy = async () => {
    if (!buyerId) {
      setError('Buyer ID is required');
      return;
    }

    try {
      const url = `https://api.gameshift.dev/nx/unique-assets/${nftId}/buy`;
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ buyerId }),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (data.consentUrl) {
        setConfirmationLink(data.consentUrl);
        setError(null);
      } else {
        setError('Failed to create purchase link');
      }
    } catch (err) {
      setError('An error occurred during the purchase');
      console.error(err);
    }
  };

  return (
    <div>
    <Header />
    <div style={styles.container}>
      {error && <p style={styles.error}>{error}</p>}
      {loading ? (
        <div style={styles.loading}>
          <p>Loading NFT details...</p>
        </div>
      ) : nft ? (
        <div style={styles.card}>
          <h1 style={styles.title}>Buy NFT</h1>
          <img src={nft.imageUrl} alt={nft.name} style={styles.image} />
          <h2 style={styles.nftName}>{nft.name}</h2>
          <p style={styles.description}>
            {nft.description || 'No description available'}
          </p>
          <p style={styles.price}>
            Price: ${(nft.priceCents / 100).toFixed(2)} USD
          </p>
          <label style={styles.label}>
            Buyer ID:
            <input
              type="text"
              value={buyerId}
              onChange={(e) => setBuyerId(e.target.value)}
              style={styles.input}
            />
          </label>
          <button onClick={handleBuy} style={styles.button}>
            Buy Now
          </button>
          {confirmationLink && (
            <div style={styles.confirmation}>
              <p>Click the link below to confirm your purchase:</p>
              <a
                href={confirmationLink}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                Confirm Purchase
              </a>
            </div>
          )}
        </div>
      ) : (
        <div style={styles.error}>
          <p>No NFT found</p>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  image: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  nftName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    color: '#777',
    marginBottom: '15px',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    marginBottom: '10px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  confirmation: {
    marginTop: '20px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '16px',
  },
  loading: {
    fontSize: '18px',
    color: '#555',
    marginTop: '20px',
  },
};

export default BuyNftPage;
