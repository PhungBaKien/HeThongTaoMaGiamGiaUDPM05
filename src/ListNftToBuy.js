import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const ListNftToBuy = () => {
  const [nfts, setNfts] = useState([]); // Danh sách NFT
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lỗi nếu có
  const navigate = useNavigate();

  useEffect(() => {
    // Hàm gọi API để lấy danh sách NFT đang được bán
    const fetchNfts = async () => {
      try {
        const url = 'https://api.gameshift.dev/nx/items?forSale=true&assetStatus=Committed';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data); // Log dữ liệu để kiểm tra

        if (data.data) {  // Kiểm tra dữ liệu trả về trong trường 'data'
          setNfts(data.data);  // Lưu danh sách NFT vào state
        } else {
          setError('No NFTs found');
        }
      } catch (err) {
        setError('An error occurred while fetching NFTs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, []);

  // Hàm xử lý khi người dùng chọn mua một NFT
  const handleSelectNft = (nftId) => {
    navigate(`/buy-nft/${nftId}`);
  };

  return (
    <div>
    <Header />
    <div style={styles.container}>
      <h1 style={styles.title}>NFTs Available for Purchase</h1>
      {loading && <p style={styles.message}>Loading NFTs...</p>}
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.nftList}>
        {nfts.length > 0 ? (
          nfts.map((nft) => (
            <div
              key={nft.item.id}
              style={styles.nftCard}
              onClick={() => handleSelectNft(nft.item.id)}
            >
              <img
                src={nft.item.imageUrl}
                alt={nft.item.name}
                style={styles.nftImage}
              />
              <h2 style={styles.nftName}>{nft.item.name}</h2>
              <p>{nft.item.description || 'No description available'}</p>
              <p style={styles.price}>Price: ${(nft.item.priceCents / 100).toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No NFTs available</p>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};

// CSS in JS Styles
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  message: {
    fontSize: '16px',
    color: '#555',
  },
  nftList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  nftCard: {
    width: '300px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    backgroundColor: '#fff',
  },
  nftCardHover: {
    transform: 'scale(1.05)',
  },
  nftImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  nftName: {
    fontSize: '18px',
    margin: '10px 0',
    fontWeight: 'bold',
  },
  price: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default ListNftToBuy;
