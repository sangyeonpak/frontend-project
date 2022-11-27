// svg imports from Bootstrap

/* unfilled eye

$(`<button class="notSeen"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg></button>`);

*/

/* filled eye

$(`<button class="seen"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg></button>`);

*/

//================================================================ global variables ===================================================================
// for main function, searchArtwork() and the modal within it

let $searchButton = $('#searchButton');
let $searchBar = $('#searchBar');
let $modalResults = $('#modal-results');
let $closeSearch = $('.closeSearch');
let $showMore = $('<button class="btn fw-bold" id="showMore">Show more</button>');

// for addRow()
let $addRow = $('#addRowBtn');
let $artworkDisplay = $('#artworkDisplay');
let containerIndex = 4;
let containerIndexEnd = 7;

// for <div id="usernameDiv">, the counter
let $seenCount = $('#seenCount');
let $seenCountCounter = 0;
$seenCount.text($seenCountCounter);

let $displayCount = $('#displayCount');
let $displayCountCounter = 0;
$displayCount.text($displayCountCounter);

//=====================================================================================================================================================
//=================================================== the main function, searchArtwork(event.target.id) ===============================================
//=====================================================================================================================================================
// this function allows GET so createResults() and appendArt() is nested in it
// it's supported by findID()

function searchArtwork(ID){

// iterating index for limiting how many results are show at once
  let index = 0;
  if ($searchBar.val() != ''){
    $.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${$searchBar.val()}`, (data) => {


//================================ function createResults(), to append results of the search ==========================================================
      function createResults(){
        let $resultDiv = $('<div class="resultDiv"></div>');
        let $resultImgDiv = $('<div class="resultImgDiv"></div>');
        let $resultInfoDiv = $('<div class="resultInfoDiv"></div>');
        $modalResults.append($resultDiv);
        $resultDiv.append($resultImgDiv);
        $resultDiv.append($resultInfoDiv);
        $.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${data.objectIDs[index]}`, (result)=>{
          // console.log(result) // info about artwork;

//append image to search results, clicking the image goes to the result of the main website
          let $resultImage = $(`<a href="${result.objectURL}" target="_blank" title="Click me to view the art on our main website."><img src="${result.primaryImageSmall}" alt="Currently unavailable for view on YourMet. Click me to view the art on our main website."></img><a>`);
          $resultImgDiv.append($resultImage);

//append artist name to search results
          let $resultArtist = $(`<div class="resultArtist fs-5">${result.artistDisplayName} (${result.artistBeginDate}-${result.artistEndDate})</div>`);
          result.artistDisplayName != '' ? $resultInfoDiv.append($resultArtist) : $resultInfoDiv.append('<div class="resultArtist fs-5">Unknown artist</div>');

          // stores results to another variable for off-canvas
          let resultArtistToPutCanvas
          result.artistDisplayName != '' ? resultArtistToPutCanvas = result.artistDisplayName : resultArtistToPutCanvas = 'Unknown';



//append artwork name to search results
          let $resultArtwork = $(`<div class="resultArtwork display-5 fst-italic">${result.title}</div>`);
          result.title != '' ? $resultInfoDiv.append($resultArtwork) : $resultInfoDiv.append('<div class="resultArtwork display-5 fst-italic">Unnamed</div>');

          // stores results to another variable for off-canvas
          let resultArtworkToPutCanvas;
          result.title != '' ? resultArtworkToPutCanvas = `<span class="fst-italic">${result.title}</span>` : resultArtworkToPutCanvas = `<span class="fst-italic">Unnamed</span>`;



//append year created to search results
          let $resultYear = $(`<div class="resultYear fs-5">${result.objectDate}</div>`);
          result.objectDate != '' ? $resultInfoDiv.append($resultYear) : $resultInfoDiv.append('<div class="resultYear fs-5">Year unknown</div>')

//append location to search results
          let $resultLocation = $(`<div class="resultLocation fs-5">${result.department}</div>`);
          result.department != '' ? $resultInfoDiv.append($resultLocation) : $resultInfoDiv.append('<div class="resultLocation fs-5">Currently not in the museum</div>');

//append the append button to the div (red +)
          let $appendArtBtn = $('<button type="button" class="appendArtBtn btn btn-danger" data-bs-dismiss="modal">+</button>');
          $resultInfoDiv.append($appendArtBtn);

//============================================= displaying your chosen art to your gallery (red + button) =============================================
          let $imageContainer = $(`#imageContainer${ID}`);
          function appendArt(ID){
            $appendArtBtn.click(()=>{

// save previous addArtworkBtn (white +) with detach, add seen button, and empty previous gallery image, gallery buttons, modal, and search
              let $addArtworkBtn = $(`#${ID}`);
              let $seenBtn = $(`<button class="notSeen btn" id="notSeen${ID}"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg></button>`);
              $addArtworkBtn.detach();
              $seenBtn.detach();
              $imageContainer.empty();
              $modalResults.empty();
              $searchBar.val('');

// appending the chosen art to the gallery container of your choice
              $imageContainer.append($resultImage);
              $imageContainer.append($addArtworkBtn);
              $imageContainer.append($seenBtn);
              seenID(ID); // add event listener to the seen button to allow it to capture event.target.id

// appending art info
              // artist name
              let $resultArtistToPut;
              result.artistDisplayName != '' ? $resultArtistToPut = $(`<div class="displayedArtistName text-wrap">${result.artistDisplayName}</div>`) : $resultArtistToPut = $('<div>Unknown</div>');
              $imageContainer.append($resultArtistToPut);

              // artwork name
              let $resultArtworkToPut;
              result.title != '' ? $resultArtworkToPut = $(`<div class="displayedArtwork fst-italic text-wrap">${result.title}</div>`) : $resultArtworkToPut = $('<div class="fst-italic">Unnamed</div>');
              $imageContainer.append($resultArtworkToPut);

              // year
              let $resultYearToPut;
              result.objectDate != '' ? $resultYearToPut = $(`<div>${result.objectDate}</div>`) : $resultYearToPut = $('<div>Year unknown</div>');
              $imageContainer.append($resultYearToPut);

// appending to offcanvas
              let $onDisplayCanvas = $('#onDisplayCanvas');
              $(`#canvasArt${ID}`).remove();
              $onDisplayCanvas.append(`<div id="canvasArt${ID}">${resultArtistToPutCanvas} - ${resultArtworkToPutCanvas}</div>`);

// imagecontainer - placeholder = on display count
              let $imageContainerCount = $('.imageContainer').length;
              let $placeHolderCount = $('.placeholder').length
              $displayCountCounter = $imageContainerCount - $placeHolderCount;
              $displayCount.text($displayCountCounter)
            });
          };// end of defining appendArt(ID);
          appendArt(ID); //adding the function event listener to my page
        });// this bracket closes off api GET
      }


//================================================================= search cases ======================================================================

// result doesn't yield anything
      if(data.total === 0){
        $modalResults.append('<h3> Oops! Please enter a valid name of an artist or artwork.');
      } else{

// less than 5 results, show all results
        if (data.total < 5){
          while (index < data.total){
            createResults();
            index++;
          }

// more than 5 results, creates results 5 times (index starts at 0)
        } else{
          while (index < 5){
            createResults();
            index++;
          }

// show 3 more button
          $modalResults.append($showMore);
          $showMore.click(()=>{
            $showMore.detach(); //detach from top
            createResults();
            index++;
            createResults();
            index++;
            createResults();
            index++;
            $modalResults.append($showMore); //attach to bottom
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
//===================================================== other buttons and important functions =========================================================
//=====================================================================================================================================================

//clears results when you close the search modal
$closeSearch.click(()=>{
  $searchBar.val('');
  $modalResults.empty();
});



//==================================================================== findID() (important) ===========================================================
// this makes finding the event.target.id possible that's used for a lot of functions

let targetBox; // id parameter!!! important: used for all button event.target.id

function findID(){
  $('.addArtworkBtn').click((event)=>{
    targetBox = event.target.id;
    console.log('my button id is:', event.target.id);
  })
}
findID(); // fire for the first three art that's there


//================================================================ seenID() and seenOffID() ===========================================================
// making finding "seen" button target.id possible, gotta call seenID() whenever art is appended

// eventListener: click unfilled eye, makes artwork "seen", does necessary appending, detaches itself, then appends filled eye
function seenID(ID){
  $(`#notSeen${ID}`).click((event)=>{
    console.log('just clicked unfilled eye; id is:', event.target.id);
    let $tempSeenBtn = $(`#notSeen${ID}`);
    $tempSeenBtn.remove();
    let $tempSeenOff = $(`<button class="seen btn" id="seen${ID}"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg></button>`);
    $(`#imageContainer${ID}`).append($tempSeenOff);

    // "Seen x artworks" counter ++
    $seenCountCounter++;
    $seenCount.text($seenCountCounter);

    //append to off-canvas
    let $onDisplayCanvasArt = $(`#canvasArt${ID}`);
    let $seenCanvas = $('#seenCanvas');
    $seenCanvas.append(`<div id="seenArt${ID}">${($onDisplayCanvasArt).html()}</div>`);

    // adds event listener to filled eye
    seenOff(ID);
  })
}

// eventListener: click filled eye, removes itself and appended texts, appends unfilled eye
function seenOff(ID){
  $(`#seen${ID}`).click((event)=>{
    console.log('just clicked FILLED eye; id is:', event.target.id);
    let $tempSeenOff = $(`#seen${ID}`);
    $($tempSeenOff).remove();
    let $tempSeenBtn = $(`<button class="notSeen btn" id="notSeen${ID}"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg></button>`);
    $(`#imageContainer${ID}`).append($tempSeenBtn);

    // remove from off-canvas
    let $seenArt = $(`#seenArt${ID}`);
    $seenArt.remove();

    // "Seen x artworks" counter --
    $seenCountCounter--;
    $seenCount.text($seenCountCounter);

    // adds event listener to unfilled eye
    seenID(ID);
  })
}

//=================================================================== search artwork clickevent =======================================================
// searchArtwork(ID) is important because it allows GET

$searchButton.click(()=>{
  $modalResults.empty();
  searchArtwork(targetBox);
});


//================================================================== add row button ===================================================================

// appends 3 new containers, detaches itself then appends itself at the bottom, and fires findID()
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
      $addedImageContainer.append('<img src="images/placeholder.jpg" class="displayedImages placeholder">');
      $addedImageContainer.append(`<button type="button" class="addArtworkBtn btn fw-bold" id="${containerIndex}" data-bs-toggle="modal" data-bs-target="#searchArt">+</button>`)
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