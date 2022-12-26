import SearchResult from './SearchResult';
import LoadingBlock from './LoadingBlock';

export default function SearchResults(props: any) {
  return (
    <div className={`flex mt-4 ${props.results !== null || props.loading ? 'overflow-x-scroll overflow-y-hidden' : null}`}>
      {props.loading && [...Array(16)].map((_, i) => (<LoadingBlock key={i}/>))}
      {props.results !== null ? 
        props.results.length === 0 ? 
          <div className="flex items-center justify-center w-full text-white text-md">No results found.</div> 
          : props.results.map((e: any) => <SearchResult key={e.id} result={e}/>) : null}
    </div>
  );
}