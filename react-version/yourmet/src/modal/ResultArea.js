import ResultArtwork from "./ResultArtwork.js";

function ResultArea(props) {


  const searchResults = props.searchResults.objectIDs;
  console.log(searchResults);
  if (props.searchResults.total === 0) {
    return <div>Oops! Please enter a valid name of an artist or artwork.</div>;
  } else if (props.searchResults.total < 5) {
    return (
      <div>
        {searchResults.map((result) => (
          <ResultArtwork key={result} result={result}/>
        ))}

      </div>
    );
  }
}
export default ResultArea;
