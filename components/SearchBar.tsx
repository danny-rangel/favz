import { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import SingleSelectPicker from "./SingleSelectPicker";

export default function SearchBar(props: any) {
  // TODO: Implement once new APIs for movies is done.
  // const [searchTopic, setSearchTopic] = useState('Albums');
  const [searchQuery, setSearchQuery] = useState('');
  const searchTopics = ['Albums', 'Movies']
  
  function handleSubmit(event: any) {
    event.preventDefault();
    props.handleSubmit(searchQuery);
  }

  // TODO: Implement once new APIs for movies is done.
  //
  // This should decide what API to use when searching.
  function handleChange(value: string) {}

  return (
    <div className="flex flex-1 w-full h-8 mt-2 font-sans">
      <form className="w-full h-full mr-4" onSubmit={handleSubmit} method="GET">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative h-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full h-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </form>
      <SingleSelectPicker options={searchTopics} initialValue="Albums" handleChange={handleChange}/>
    </div>
)}