import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const MarketNft = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const response = await fetch('https://api.gameshift.dev/nx/items', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
          },
        });
        const data = await response.json();
        setNfts(data.data.map((item) => item.item));
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNfts();
  }, []);

  const handleSell = (id) => navigate(`/sell-nft/${id}`);
  const handleStopSelling = (id) => navigate(`/stop-selling-nft/${id}`);

  if (loading) return <div style={styles.loading}>Đang tải dữ liệu...</div>;

  if (!nfts || nfts.length === 0)
    return <div style={styles.noNfts}>Không có NFT nào để hiển thị.</div>;

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>Manage NFT</h1>
          <Link to="/create-nft" style={styles.addButton}>
            Thêm mới NFT
          </Link>
        </div>
        <div style={styles.nftList}>
          {nfts.map((nft) => (
            <div key={nft.id} style={styles.nftItem}>
              <img src={nft.imageUrl} alt={nft.name} style={styles.nftImage} />
              <h3 style={styles.nftName}>{nft.name}</h3>
              <p style={styles.nftPrice}>
                {(nft.priceCents / 100).toFixed(2)} USD
              </p>
              <div style={styles.buttonContainer}>
                <button
                  style={{ ...styles.button, ...styles.sellButton }}
                  onClick={() => handleSell(nft.id)}
                >
                  Đăng bán
                </button>
                <button
                  style={{ ...styles.button, ...styles.stopButton }}
                  onClick={() => handleStopSelling(nft.id)}
                >
                  Dừng bán
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#4caf50',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
  noNfts: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
  nftList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  nftItem: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
  },
  nftImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '15px',
    borderRadius: '10px',
  },
  nftName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  nftPrice: {
    fontSize: '16px',
    color: '#888',
    margin: '10px 0',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  button: {
    padding: '8px 15px',
    fontSize: '14px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  sellButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  stopButton: {
    backgroundColor: '#e53935',
    color: '#fff',
  },
};

export default MarketNft;
