//================================================== add row button on the bottom to put more shelves ============================================//
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




//======================================================= searching for albums (WIP) =============================================================//
$searchButton = $('#searchButton');
$searchBar = $('#searchBar');

console.log($searchBar);
function searchAlbums(){ // will continue after i learn more on how to use Spotify's api
  console.log('testing');
  console.log($searchBar.val());
  if ($searchBar.val() != ''){
    console.log('correct;')
    $.get(`https://api.spotify.com/v1/albums/${$searchBar.val()}`, (data) => {
      console.log(data);
      console.log('correct');
    })
  }
}

$searchButton.click(()=>{
  searchAlbums();
});