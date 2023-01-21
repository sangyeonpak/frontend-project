import ResultArtwork from "./ResultArtwork.js";
import { useState } from "react";
function ResultArea(props) {
  const searchResults = props.searchResults.objectIDs;
  console.log(searchResults);
  const [index, setIndex] = useState(5);
  function showMore() {
    setIndex((oldIndex) => oldIndex + 5);
  }

  if (props.searchResults.total === 0) {
    return <div>Oops! Please enter a valid name of an artist or artwork.</div>;
  } else if (props.searchResults.total <= 5) {
    return (
      <div>
        {searchResults.map((result) => (
          <ResultArtwork key={result} result={result} />
        ))}
      </div>
    );
  } else if (props.searchResults.total > 5) {
    return (
      <div>
        {searchResults.slice(0, index).map((result) => (
          <ResultArtwork key={result} result={result} />
        ))}
        <button onClick={showMore}>Show more</button>
      </div>
    );
  }
}
export default ResultArea;
