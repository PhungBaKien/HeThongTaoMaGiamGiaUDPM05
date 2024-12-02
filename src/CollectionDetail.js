import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const CollectionDetail = () => {
  const { state } = useLocation(); // Lấy state từ navigate
  const { collectionId } = state || {}; // Lấy collectionId từ state
  const [nfts, setNfts] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng

  useEffect(() => {
    if (collectionId) {
      // Fetch thông tin chi tiết collection và các NFT của collection
      fetch(`https://api.gameshift.dev/nx/asset-collections/${collectionId}/assets`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-api-key": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setNfts(data.data); // Lưu danh sách NFT
        })
        .catch((err) => console.error(err));
    }
  }, [collectionId]);

  if (!collectionId) return <div>Collection not found</div>;

  const handleCreateNFT = () => {
    // Điều hướng đến trang tạo NFT và truyền collectionId vào URL
    navigate(`/create-nft?collectionId=${collectionId}`);
  };

  // Điều hướng đến trang chi tiết NFT
  const handleViewNFT = (nftId) => {
    navigate(`/nft/${nftId}`); // Điều hướng đến trang chi tiết NFT với id
  };

  return (
    <div>
    <Header />
    <div style={{ textAlign: 'center', margin: '0 auto', padding: '20px', maxWidth: '1200px' }}>
      <h1>Collection Detail</h1>
      <div>
        <h2>NFTs in this collection</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {nfts.map((nft) => (
            <div
              key={nft.item.id}
              style={{
                width: '200px',
                textAlign: 'center',
                marginBottom: '20px',
                cursor: 'pointer', // Đổi con trỏ khi hover
              }}
              onClick={() => handleViewNFT(nft.item.id)} // Gọi handleViewNFT khi click vào NFT
            >
              <img
                src={nft.item.imageUrl}
                alt={nft.item.name}
                style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  marginBottom: '10px',
                }}
              />
              <h3>{nft.item.name}</h3>
              <p>{nft.item.description}</p>
              {nft.item.priceCents && (
                <p style={{ fontWeight: 'bold', color: '#007bff' }}>
                  Price: {nft.item.priceCents} Sol
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleCreateNFT}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            fontSize: '16px',
          }}
        >
          Tạo NFT
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default CollectionDetail;
