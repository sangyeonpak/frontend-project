let $addRow = $('#addRow');
let $container = $('.container');
let $addAlbumBtn = $('#addAlbumBtn');


function addRow(){
  $addRow.click(()=>{
    $addRow.detach();
    let $rowActual = $('<div></div>').addClass('row').attr('id', 'addedRow');
    $container.append($rowActual);
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
    $rowActual.append($addRow);
  });
}

addRow();