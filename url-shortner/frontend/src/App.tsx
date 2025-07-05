import { useState, useEffect } from 'react';
import './App.css';

interface Url {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
}

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [urls, setUrls] = useState<Url[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      // TODO: Add API call to fetch URLs from http://localhost:5000/api/urls
      // then set the URLs to the state
      // setUrls(data)
      const response = await fetch('http://localhost:5002/api/urls');
      const data: Url[] = await response.json();
      setUrls(data);
    } catch (error) {
      // TODO: Handle error
      console.error('Error fetching URLs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl) return;

    setIsLoading(true);
    try {
      // TODO: Add API call to shorten URL and set the originalUrl to empty string
      // then fetch the URLs again
      // setOriginalUrl('')
      // fetchUrls()
      await fetch('http://localhost:5002/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });
      setOriginalUrl('');
      fetchUrls();
    } catch (error) {
      // TODO: Handle error
      console.error('Error shortening URL:', error);
    } finally {
      // TODO: Set isLoading to false
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`http://localhost:5002/${url}`);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const formatUrl = (url: string) => {
    if (url.length > 50) {
      return url.substring(0, 50) + '...';
    }
    return url;
  };

  return (
    <div className="app">
      <h1>LinkShrinker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL here"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Shorten URL'}
        </button>
      </form>

      <ul>
        {urls.map((url) => (
          <li key={url._id}>
            <p>Original: {formatUrl(url.originalUrl)}</p>
            <a
              href={`http://localhost:5002/${url.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Shortened: localhost:5002/{url.shortUrl}
            </a>
            <button onClick={() => copyToClipboard(url.shortUrl)}>
              {copiedUrl === url.shortUrl ? 'Copied!' : 'Copy'}
            </button>
            <p>Clicks: {url.clicks}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
