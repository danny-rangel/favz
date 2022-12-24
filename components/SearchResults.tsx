import SearchResult from './SearchResult';

export default function SearchResults(props: any) {
  return (
    <div className="flex mt-4 overflow-x-scroll overflow-y-hidden">
      {props.results.map((e: any) => <SearchResult key={e.id} result={e}/>)}
    </div>
  );
}