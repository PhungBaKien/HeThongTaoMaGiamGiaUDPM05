import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

const CollectionManager = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.gameshift.dev/nx/asset-collections", {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCollections(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCollectionClick = (collectionId) => {
    navigate(`/collection/${collectionId}`, { state: { collectionId } });
  };

  const handleDeleteCollection = (collectionId) => {
    setCollections((prevCollections) =>
      prevCollections.filter((col) => col.id !== collectionId)
    );
  };

  if (loading) {
    return <div style={{ textAlign: "center", fontSize: "18px" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ color: "#333" }}>Manage NFT Collections</h1>
          <Link
            to="/create-collection"
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Thêm mới danh mục
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "20px",
            paddingBottom: "20px",
            gridAutoRows: "minmax(200px, auto)",
          }}
        >
          {collections.length === 0 ? (
            <div style={{ textAlign: "center", width: "100%" }}>
              No collections available.
            </div>
          ) : (
            collections.map((collection) => (
              <div
                key={collection.id}
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={collection.imageUrl}
                  alt={collection.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    objectFit: "cover",
                  }}
                />
                <h3 style={{ color: "#333", fontSize: "16px", margin: "0" }}>
                  {collection.name}
                </h3>
                <p
                  style={{
                    color: "#555",
                    fontSize: "14px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  {collection.description}
                </p>
                <p style={{ color: "#888", fontSize: "12px" }}>
                  <strong>Environment:</strong> {collection.environment}
                </p>
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleCollectionClick(collection.id)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "10px",
                      fontSize: "14px",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleDeleteCollection(collection.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CollectionManager;
