import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const CreateCollection = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Hàm xử lý việc tạo collection
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const url = 'https://api.gameshift.dev/nx/asset-collections';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ZmNmNWRkZi00NzNiLTQ2MzctYjgwNy1lOWE2MTE4ODc1MzIiLCJzdWIiOiI5NTk5YTc3MC1kOTViLTRkOTEtOTUxYi1hMTY2NzM1NTM5ZDgiLCJpYXQiOjE3MzIxODE5ODN9.9WGScu45usjoL0IoTzxoLz6ShKHbg6-vcPAtjuMbZ1E', // Thay bằng API key của bạn
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        imageUrl,
      }),
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to create collection');
        }
        return res.json();
      })
      .then((json) => {
        setResult(json);
        setIsSubmitting(false);
      })
      .catch(() => {
        setError('Failed to create collection. Please try again later.');
        setIsSubmitting(false);
      });
  };

  // Hàm sao chép collection ID vào clipboard
  const copyToClipboard = () => {
    if (result && result.id) {
      navigator.clipboard.writeText(result.id)
        .then(() => alert('Collection ID copied to clipboard!'))
        .catch((err) => console.error('Failed to copy: ', err));
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    },
    title: {
      textAlign: 'center',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      backgroundColor: '#000',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    buttonHover: {
      backgroundColor: '#333',
    },
    error: {
      color: 'red',
      marginTop: '20px',
      textAlign: 'center',
    },
    result: {
      marginTop: '20px',
      textAlign: 'center',
    },
    successTitle: {
      color: '#4CAF50',
    },
    image: {
      maxWidth: '200px',
      marginTop: '10px',
      borderRadius: '4px',
    },
    copyButton: {
      padding: '10px 20px',
      backgroundColor: '#000',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    linkButton: {
      padding: '10px 20px',
      backgroundColor: '#000',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Create Collection</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL:</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isSubmitting ? styles.buttonDisabled : {}),
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = styles.button.backgroundColor;
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Collection'}
          </button>
        </form>

        {error && <div style={styles.error}>{error}</div>}

        {result && (
          <div style={styles.result}>
            <h3 style={styles.successTitle}>Collection Created Successfully!</h3>
            <p>
              <strong>ID:</strong> {result.id}
            </p>
            <p>
              <strong>Name:</strong> {result.name}
            </p>
            <p>
              <strong>Description:</strong> {result.description}
            </p>
            <img
              src={result.imageUrl}
              alt="Collection"
              style={styles.image}
            />
            <div style={styles.buttonGroup}>
              <button
                onClick={copyToClipboard}
                style={styles.copyButton}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.copyButton.backgroundColor)}
              >
                Copy Collection ID
              </button>
              <a
                href="/manage-collections"
                style={styles.linkButton}
              >
                Go to Manage Collections
              </a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CreateCollection;
