import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const NftDetail = () => {
  const { nftId } = useParams(); // Lấy nftId từ URL
  const [nft, setNft] = useState(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [cancelLink, setCancelLink] = useState('');
  const navigate = useNavigate(); // Điều hướng

  useEffect(() => {
    if (nftId) {
      fetch(`https://api.gameshift.dev/nx/items/${nftId}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setNft(data.item);
          setNewName(data.item.name);
          setNewDescription(data.item.description);
          setNewImageUrl(data.item.imageUrl);
        })
        .catch((err) => console.error('Error fetching NFT details:', err));
    }
  }, [nftId, isUpdated]);

  const handleUpdateNFT = () => {
    fetch(`https://api.gameshift.dev/nx/unique-assets/${nftId}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: newImageUrl,
        name: newName,
        description: newDescription,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setIsUpdated((prev) => !prev);
        alert('NFT updated successfully!');
        navigate(-1);
      })
      .catch((err) => console.error('Error updating NFT:', err));
  };

  const handleCancelListing = () => {
    fetch(`https://api.gameshift.dev/nx/unique-assets/${nftId}/cancel-listing`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && json.link) {
          setCancelLink(json.link);
          alert('NFT sale has been canceled!');
        }
      })
      .catch((err) => alert('Error canceling sale.'));
  };

  if (!nft) return <div>Loading...</div>;

  return (
    <div>
    <Header />
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px',
        minHeight: '100vh',
        backgroundColor: '#f4f6f9',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Thông tin NFT */}
      <div
        style={{
          flex: 1,
          maxWidth: '500px',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          marginRight: '20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
          {nft.name}
        </h1>
        <img
          src={nft.imageUrl}
          alt={nft.name}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '10px',
            margin: '20px 0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
        <p style={{ fontSize: '16px', color: '#555' }}>
          <strong>Description:</strong> {nft.description}
        </p>
        <p style={{ fontSize: '16px', color: '#555' }}>
          <strong>Price:</strong>{' '}
          {nft.price?.naturalAmount || 'Not Available'}{' '}
          {nft.price?.currencyId || ''}
        </p>
      </div>

      {/* Form chỉnh sửa */}
      <div
        style={{
          flex: 1,
          maxWidth: '400px',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
          }}
        >
          Update NFT
        </h2>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="name" style={{ marginTop: '10px' }}>
            Name
          </label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
          />

          <label htmlFor="description" style={{ marginTop: '10px' }}>
            Description
          </label>
          <textarea
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
          ></textarea>

          <label htmlFor="imageUrl" style={{ marginTop: '10px' }}>
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '20px',
            }}
          />

          <button
            type="button"
            onClick={handleUpdateNFT}
            style={{
              padding: '10px',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            Update NFT
          </button>

          <button
            type="button"
            onClick={handleCancelListing}
            style={{
              padding: '10px',
              backgroundColor: '#ff3333',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cancel Listing
          </button>

          {cancelLink && (
            <p style={{ marginTop: '10px', color: 'green' }}>
              <a href={cancelLink} target="_blank" rel="noopener noreferrer">
                View Cancel Link
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default NftDetail;
