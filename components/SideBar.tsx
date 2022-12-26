import { useState } from "react";

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default function Sidebar() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(searchQuery: string) {
    setLoading(true);
    fetch('/api/music', {
      method: 'POST',
      body: JSON.stringify({searchQuery: searchQuery}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      setResults(data);
      setLoading(false);
    });
  }

  return (
    <div className="w-full flex flex-col px-2 mt-2">
      <SearchBar handleSubmit={handleSubmit}/>
      <SearchResults results={results} loading={loading}/>
    </div>
)}