//================================================== change theme ============================================//
let $addRow = $('#addRow'); // call button to add rows
let $container = $('.container'); // call container
let $addAlbumBtn = $('#addAlbumBtn'); // call button to add albums (non-functional right now)

function addRow(){
  $addRow.click(()=>{

    // get rid of the add row button from the bottom (for now)
    $addRow.detach();

    // create the main row (shelf) div
    let $rowActual = $('<div></div>').addClass('row').attr('id', 'addedRow');

    // append the row to container div
    $container.append($rowActual);

    // creating the same column structure like in the HTML 3 times within the main row div
    for (var i = 0; i < 3; i++){
      let $column = $('<div></div>').addClass('col');
      let $rowInner = $('<div></div>').addClass('row');
      let $border = $('<span></span>').addClass('border');
      let $rowUnderBorder = $('<div></div>').addClass('row');
      let $columnImg = $('<div></div>').addClass('col');
      let $placeholder = $('<img>').attr('src', 'images/placeholder.jpg').attr('alt','Add an album here').addClass('rounded');
      let $columnText = $('<div></div>').addClass('col');
      let $addAlbumBtn = $('<button></button>').attr('type','button').attr('id','addAlbumBtn').addClass('btn btn-success float-end').attr('data-bs-toggle','modal').attr('data-bs-target','#searchAlbum').text('+');
      $rowActual.append($column);
      $column.append($rowInner);
      $rowInner.append($border);
      $border.append($rowUnderBorder);
      $rowUnderBorder.append($columnImg);
      $rowUnderBorder.append($columnText);
      $columnImg.append($placeholder);
      $columnText.append('<ul></ul>').append('<li>test</li>');
      $border.append($addAlbumBtn);
    }

    // re-attach the add row button to the bottom after creating the row div after the for loop
    $rowActual.append($addRow);
  });
}

addRow();
//================================================================================================================================================//




//======================================================= searching for artwork (WIP) =============================================================//
let $searchButton = $('#searchButton');
let $searchBar = $('#searchBar');
let $modalResults = $('#modal-results');
let $closeSearch = $('.closeSearch');
let $showMore = $('<button class="btn btn-secondary" id="showMore">Show more</button>');


function searchArtwork(){
  if ($searchBar.val() != ''){
    $.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${$searchBar.val()}`, (data) => {
      console.log(data.total);
      console.log(data);

      let index = 0;

      function createResults(){
        let $resultDiv = $('<div id="resultDiv"></div>');
        let $resultImg = $('<div id="resultImg"></div>');
        let $resultInfo = $('<div id="resultInfo"></div>');
        $modalResults.append($resultDiv);
        $resultDiv.append($resultImg);
        $resultDiv.append($resultInfo);

      }

      if(data.total === 0){
        $modalResults.append('<h3> Oops! Please enter a valid name of an artist or artwork.');
      } else{
        if (data.total < 5){
          while (index < data.total){
            createResults();
            console.log(data.objectIDs);
            $.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${data.objectIDs}`, (result)=>{
              console.log(result);
            });
            index++;
          }
        } else{
          while (index < 4){
            createResults();
            index++;
          }
          $modalResults.append($showMore);
        }
      }
    })
  } else{

    $modalResults.append('<h3> Oops! Please enter a valid name of an artist or artwork.');
  }
}


$searchButton.click(()=>{
  searchArtwork();
});

$closeSearch.click(()=>{
  $searchBar.val('');
  $modalResults.empty();
});
//==================================================================================================================================================//