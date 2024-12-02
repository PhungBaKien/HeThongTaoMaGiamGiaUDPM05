import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateNFT = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [userReferenceId, setUserReferenceId] = useState('');
  const [price, setPrice] = useState('');
  const [nftResult, setNftResult] = useState(null);
  const [marketUrl, setMarketUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('collectionId');
    if (id) {
      setCollectionId(id);
    }
  }, [search]);

  const handleCreateNFT = async (event) => {
    event.preventDefault();
    setError(null);

    if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i)) {
      setError('Please enter a valid image URL.');
      return;
    }

    try {
      const response = await fetch('https://api.gameshift.dev/nx/unique-assets', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          details: {
            collectionId,
            description,
            imageUrl,
            name,
          },
          destinationUserReferenceId: userReferenceId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create NFT: ${response.statusText}`);
      }

      const data = await response.json();
      setNftResult(data);

      // Chuyển hướng đến trang /manage-nft sau khi thành công
      navigate('/manage-nft');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleListForSale = async () => {
    setError(null);

    if (price <= 0) {
      setError('Price must be greater than 0.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.gameshift.dev/nx/unique-assets/${nftResult.id}/list-for-sale`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            price: { currencyId: 'USDC', naturalAmount: price },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to list NFT for sale: ${response.statusText}`);
      }

      const data = await response.json();
      setMarketUrl(data.consentUrl);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Create NFT</h1>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      <form onSubmit={handleCreateNFT}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '10px 0' }}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '10px 0' }}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '10px 0' }}
          />
        </div>
        <div>
          <label>Collection ID:</label>
          <input
            type="text"
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '10px 0' }}
          />
        </div>
        <div>
          <label>User Reference ID:</label>
          <input
            type="text"
            value={userReferenceId}
            onChange={(e) => setUserReferenceId(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '10px 0' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Create NFT
        </button>
      </form>

      {nftResult && (
        <div style={{ marginTop: '20px' }}>
          <h3>NFT Created Successfully!</h3>
          <p>
            <strong>ID:</strong> {nftResult.id}
          </p>
          <p>
            <strong>Name:</strong> {nftResult.name}
          </p>
          <p>
            <strong>Description:</strong> {nftResult.description}
          </p>
          <img
            src={nftResult.imageUrl}
            alt="NFT"
            style={{ maxWidth: '200px', marginTop: '10px' }}
          />
        </div>
      )}

      {nftResult && !marketUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Set Price for NFT</h3>
          <div>
            <label>Price (in USDC):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          <button
            onClick={handleListForSale}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            List NFT for Sale
          </button>
        </div>
      )}

      {marketUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Confirm Listing</h3>
          <p>
            Click the link to confirm the listing of your NFT:
            <br />
            <a href={marketUrl} target="_blank" rel="noopener noreferrer">
              Confirm Listing
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateNFT;
