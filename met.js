let $searchButton = $('#searchButton');
let $searchBar = $('#searchBar');
let $modalResults = $('#modal-results');
let $closeSearch = $('.closeSearch');
let $showMore = $('<button class="btn btn-secondary" id="showMore">Show more</button>');

//=====================================================================================================================================================
//=================================================== THE MAIN FUNCTION, searchArtwork(event.target.id) ===============================================
//=====================================================================================================================================================
function searchArtwork(ID){
  let index = 0;
  if ($searchBar.val() != ''){
    $.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${$searchBar.val()}`, (data) => {



//============================================================== function createResults() =============================================================
      function createResults(){
        let $resultDiv = $('<div class="resultDiv"></div>');
        let $resultImgDiv = $('<div class="resultImgDiv"></div>');
        let $resultInfoDiv = $('<div class="resultInfoDiv"></div>');
        $modalResults.append($resultDiv);
        $resultDiv.append($resultImgDiv);
        $resultDiv.append($resultInfoDiv);
        $.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${data.objectIDs[index]}`, (result)=>{
          console.log(ID);

//append image to result div
          let $resultImage = $(`<a href="${result.objectURL}"><img src="${result.primaryImageSmall}" alt="Currently unavailable for view on YourMet. Click me to view the art on our main website."></img><a>`);
          $resultImgDiv.append($resultImage);
          let $appendArtBtn = $('<button type="button" class="appendArtBtn btn btn-danger" data-bs-dismiss="modal">+</button>');
          $resultInfoDiv.append($appendArtBtn);

//append artist name to result div
          let $resultArtist = $(`<div class="resultArtist fs-5">${result.artistDisplayName} (${result.artistBeginDate}-${result.artistEndDate})</div>`);
          let $resultArtistToPut = $(`<div>${result.artistDisplayName}</div>`);
          result.artistDisplayName != '' ? $resultInfoDiv.append($resultArtist) : $resultInfoDiv.append('<div class="resultArtist fs-5">Unknown artist</div>');

//append artwork name to result div
          let $resultArtwork = $(`<div class="resultArtwork display-5 fst-italic">${result.title}</div>`);
          let $resultArtworkToPut = $(`<div class="resultArtwork fst-italic">${result.title}</div>`);
          switch (result.title){
            case '':
              $resultInfoDiv.append('<div class="resultArtwork display-5 fst-italic">Unnamed</div>');
              break;
            default:
              $resultInfoDiv.append($resultArtwork);
              break;
          }
//append year created to result div
          let $resultYear = $(`<div class="resultYear fs-5">${result.objectDate}</div>`);
          let $resultYearToPut = $(`<div>${result.objectDate}</div>`);
          if (result.objectDate === ''){
            $resultInfoDiv.append('<div class="resultYear fs-5">Year unknown</div>')
          } else{
            $resultInfoDiv.append($resultYear);
          }

//append location to result div
          let $resultLocation = $(`<div class="resultLocation fs-5">${result.department}</div>`);
          result.department != '' ? $resultInfoDiv.append($resultLocation) : $resultInfoDiv.append('<div class="resultLocation fs-5">Currently not in the museum</div>');

//append result to the container you chose
          let $imageContainer = $(`#imageContainer${ID}`);
          $appendArtBtn.click((ID)=>{

//empty previous image, modal, and what you searched
            $imageContainer.empty();
            $modalResults.empty();
            $searchBar.val('');
//=====================================================================================================================================================



//=============================================== append result to the container you chose ============================================================
            $imageContainer.append($resultImage);
            $imageContainer.append(`<button type="button" class="addArtworkBtn btn btn-secondary" id="${ID}" data-bs-toggle="modal" data-bs-target="#searchArt">+</button>`);
            result.artistDisplayName != '' ? $imageContainer.append($resultArtistToPut) : $imageContainer.append('<div>Unknown artist</div>');
            switch (result.title){
              case '':
                $imageContainer.append('<div class="fst-italic">Unnamed</div>');
                break;
              default:
                $imageContainer.append($resultArtworkToPut);
                break;
            }
            if (result.objectDate === ''){
              $imageContainer.append('<div>Year unknown</div>')
            } else{
              $imageContainer.append($resultYearToPut);
            }
          });
        });
      }
//=====================================================================================================================================================



//================================================================= search cases ======================================================================
      if(data.total === 0){
        $modalResults.append('<h3> Oops! Please enter a valid name of an artist or artwork.');
      } else{

// less than 5 results
        if (data.total < 5){
          while (index < data.total){
            createResults();
            index++;
          }

// more than 5 results
        } else{
          while (index < 5){
            createResults();
            index++;
          }

// show more button
          $modalResults.append($showMore);
          $showMore.click(()=>{
            $showMore.detach();
            createResults();
            index++;
            createResults();
            index++;
            createResults();
            index++;
            $modalResults.append($showMore);
          })
        }
      }
    })

// when you don't put anything in the search bar
  } else{
    $modalResults.append('<h3> Oops! Please enter a valid name of an artist or artwork.');
  }
}
//=====================================================================================================================================================
//=====================================================================================================================================================
//=====================================================================================================================================================




//================================================================== firing all other buttons =========================================================
// close search modal
$closeSearch.click(()=>{
  $searchBar.val('');
  $modalResults.empty();
});

// finding the event.target.id
let targetBox;
$('.addArtworkBtn').click((event)=>{
  targetBox = event.target.id;
  console.log('my button id is:', event.target.id);
})

// search artwork
$searchButton.click(()=>{
  $modalResults.empty();
  searchArtwork(targetBox);
});
//=====================================================================================================================================================
let containerIndex = 4;
let containerIndexEnd = 7;
let $addRow = $('#addRowBtn');
let $artworkDisplay = $('#artworkDisplay');

function addRow(containerIndex){
  $addRow.click(()=>{
    let $prevAddRowBtnDiv = $('#addRowBtnDiv');
    $addRow.detach();
    $prevAddRowBtnDiv.remove();
    let $addedRow = $('<div class="displayRow row"></div>');
    $artworkDisplay.append($addedRow);

    while (containerIndex < containerIndexEnd){
      console.log('container index', containerIndex);
      let $column = $('<div class="col text-center"></div>');
      let $addedImageContainer = $(`<div class="imageContainer" id="imageContainer${containerIndex}"></div>`);
      $addedRow.append($column);
      $column.append($addedImageContainer);
      $addedImageContainer.append('<img src="images/placeholder.jpg">');
      $addedImageContainer.append(`<button type="button" class="addArtworkBtn btn btn-secondary" id="${containerIndex}" data-bs-toggle="modal" data-bs-target="#searchArt">+</button>`)
      containerIndex++;
    }
    containerIndexEnd += 3;
    console.log('new max', containerIndexEnd);

    let $addRowBtnDiv = $('<div class="row" id="addRowBtnDiv"></div>');
    $artworkDisplay.append($addRowBtnDiv);
    $addRowBtnDiv.append($addRow);
  });
}

addRow(containerIndex);
//================================================================================================================================================//