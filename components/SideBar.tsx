import { useState } from "react";

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default function Sidebar() {
  const [results, setResults] = useState([]);

  function handleSubmit(searchQuery: string) {
    fetch('/api/music', {
      method: 'POST',
      body: JSON.stringify({searchQuery: searchQuery}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => setResults(data));
  }

  return (
    <div className="w-full flex flex-col px-2 mt-2">
      <SearchBar handleSubmit={handleSubmit}/>
      {results.length > 0 && <SearchResults results={results}/>}
    </div>
)}