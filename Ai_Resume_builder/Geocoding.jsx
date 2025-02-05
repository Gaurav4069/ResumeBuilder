import React, { useState } from 'react';

const Geocoding = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query) {
      const url = `https://api.locationiq.com/v1/autocomplete.php?key=pk.8152931c0b2b98a57bb3d874f5f97e0a&q=${query}&limit=5&dedupe=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="geocoding-container h-fit">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter location"
        className="geocoding-input"
      />
      
      {results.length > 0 && (
        <ul className="geocoding-results">
          {results.map((result, index) => (
            <li key={index} className="geocoding-result-item">
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Geocoding;
