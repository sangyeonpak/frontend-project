/* unfilled eye

$(`<button class="notSeen"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg></button>`);

*/

/* filled eye

$(`<button class="seen"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg></button>`);

*/

// for main function, searchArtwork() and the modal within it

let $searchButton = $('#searchButton');
let $searchBar = $('#searchBar');
let $modalResults = $('#modal-results');
let $closeSearch = $('.closeSearch');
let $showMore = $('<button class="btn btn-secondary" id="showMore">Show more</button>');

// for addRow()
let $addRow = $('#addRowBtn');
let $artworkDisplay = $('#artworkDisplay');
let containerIndex = 4;
let containerIndexEnd = 7;

// for <div id="usernameDiv">
let $seenCount = $('#seenCount');
let $reviewCount = $('#reviewCount');
let $displayCount = $('#displayCount');
let $seenCountCounter = 0;
let $reviewCountCounter = 0;
let $displayCountCounter = 0;
$seenCount.text($seenCountCounter);
$reviewCount.text($reviewCountCounter);
$displayCount.text($displayCountCounter);


//=====================================================================================================================================================
//=================================================== the main function, searchArtwork(event.target.id) ===============================================
//=====================================================================================================================================================
function searchArtwork(ID){

  // iterating index for limiting how many results are show at once
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
          // console.log(result) // info about artwork;

//append image to result div
          let $resultImage = $(`<a href="${result.objectURL}" target="_blank" title="Click me to view the art on our main website."><img src="${result.primaryImageSmall}" alt="Currently unavailable for view on YourMet. Click me to view the art on our main website."></img><a>`);
          $resultImgDiv.append($resultImage);
          let $appendArtBtn = $('<button type="button" class="appendArtBtn btn btn-danger" data-bs-dismiss="modal">+</button>');
          $resultInfoDiv.append($appendArtBtn);

//append artist name to result div
          let $resultArtist = $(`<div class="resultArtist fs-5">${result.artistDisplayName} (${result.artistBeginDate}-${result.artistEndDate})</div>`);
          let $resultArtistToPut = $(`<div class="displayedArtistName text-wrap">${result.artistDisplayName}</div>`);
          result.artistDisplayName != '' ? $resultInfoDiv.append($resultArtist) : $resultInfoDiv.append('<div class="resultArtist fs-5">Unknown artist</div>');

//append artwork name to result div
          let $resultArtwork = $(`<div class="resultArtwork display-5 fst-italic">${result.title}</div>`);
          let $resultArtworkToPut = $(`<div class="displayedArtwork fst-italic text-wrap">${result.title}</div>`);
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


//=============================================== append result to the container you chose (red + button) =============================================
          let $imageContainer = $(`#imageContainer${ID}`);
          function appendArt(ID){
            $appendArtBtn.click(()=>{
// save addArtworkBtn empty previous image, modal, and what you searched

              let $addArtworkBtn = $(`#${ID}`);
              let $seenBtn = $(`<button class="notSeen btn" id="notSeen${ID}"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg></button>`);
              $addArtworkBtn.detach();
              $seenBtn.detach();
              $imageContainer.empty();
              $modalResults.empty();
              $searchBar.val('');

// the appending part
              $imageContainer.append($resultImage);
              $imageContainer.append($addArtworkBtn);
              $imageContainer.append($seenBtn);
              seenID(ID);
              seenOff(ID);
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

// imagecontainer - placeholder = on display count
              let $imageContainerCount = $('.imageContainer').length;
              let $placeHolderCount = $('.placeholder').length
              $displayCountCounter = $imageContainerCount - $placeHolderCount;
              $displayCount.text($displayCountCounter)
            });
          };// end of appendArt(ID);
          appendArt(ID);
        });// closes off api GET
      }


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

// show 3 more button
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




//=====================================================================================================================================================
//================================================================== firing all other buttons =========================================================
//=====================================================================================================================================================
// close search modal
$closeSearch.click(()=>{
  $searchBar.val('');
  $modalResults.empty();
});

// making finding the addArtwork target.id possible, gotta call findID() again when rows are added
let targetBox;
function findID(){
  $('.addArtworkBtn').click((event)=>{
    targetBox = event.target.id;
    console.log('my button id is:', event.target.id);
  })
}
findID();

// making finding seen target.id possible, gotta call seenID whenever art is appended
// let seenTargetBox;
// let seenFilled;
let tempSeenBtn;
let tempSeenOff;
function seenID(ID){
  $(`#notSeen${ID}`).click((event)=>{
    // seenTargetBox = event.target.id;
    console.log('just clicked unfilled eye; id is:', event.target.id);
    tempSeenBtn = $(`#notSeen${ID}`);
    tempSeenBtn.detach();
    $tempSeenOff = $(`<button class="seen btn" id="seen${ID}"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg></button>`);
    $(`#imageContainer${ID}`).append($tempSeenOff);
  })
}
function seenOff(ID){
  $(`#seen${ID}`).click((event)=>{
    // seenFilled = event.target.id;
    console.log('just clicked FILLED eye; id is:', event.target.id);
    this.detach();
    $(`#imageContainer${ID}`).append($tempSeenBtn);
  })
}

// search artwork clickevent;
$searchButton.click(()=>{
  $modalResults.empty();
  searchArtwork(targetBox);
});


//================================================================== add row button ===================================================================
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
      $addedImageContainer.append('<img src="images/placeholder.jpg" class="displayedImages align-middle">');
      $addedImageContainer.append(`<button type="button" class="addArtworkBtn btn btn-secondary" id="${containerIndex}" data-bs-toggle="modal" data-bs-target="#searchArt">+</button>`)
      containerIndex++;
    }
    containerIndexEnd += 3;
    console.log('new max', containerIndexEnd);

    let $addRowBtnDiv = $('<div class="row mt-3" id="addRowBtnDiv"></div>');
    $artworkDisplay.append($addRowBtnDiv);
    $addRowBtnDiv.append($addRow);
    findID();
  });
}

addRow(containerIndex);

//================================================================== seen button ======================================================================

//=====================================================================================================================================================
//=====================================================================================================================================================
//=====================================================================================================================================================