var charLimit = 10;

$(document).ready(function() {
  // Add box
  function addBox(id) {
    // Get the next box
    var $box = $("#" + id);

    // Check if box exists
    if (!$box.length) {
      // Add a box
      $("#mulboxes").append('<div class="wrapper"><textarea class="mulbox" id="' + id + '" maxlength="140" rows="10" cols="30" placeholder="Write some shit here! "></textarea><button class="btn btnCopy"><i class="fas fa-copy"></i></button></div>');
    }
  }

  // Remove box
  function removeBox(id) {
    // Get the next box
    var $box = $("#" + id);

    // Check if box exists
    if ($box.length === 1) {
      // Add a box
      $box.remove();
    }
  }

  $("#addBox").click(function(event) {
    var boxes = $(".mulbox").length
    addBox(boxes + 1);
  });

  $("#removeBox").click(function(event) {
    var boxes = $(".mulbox").length
    removeBox(boxes);
  });
//Modal 
  var modal = document.getElementById('modal');

  var btnModal = document.getElementById('btnModal');

  var span = document.getElementsByClassName('close')[0];

  btnModal.onclick = function() {
    modal.style.display = "block";
  };

  span.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
});

window.onload=function(){ 
  var toggle = document.getElementById('toggleBtnWrapper');
  var toggleWrap = document.getElementById('toggleBtnWrapper-2');
  var toggleNumber;

  toggle.addEventListener('click', function() {
    toggleNumber = !toggleNumber;
    if(toggleNumber) {
      toggleWrap.style.clipPath = 'inset(0 0 0 50%)';
      toggleWrap.style.backgroundColor = '#89C623';
      } else {
        toggleWrap.style.clipPath = 'inset(0 50% 0 0)';
        toggleWrap.style.backgroundColor = '#0084b4';
      }
    console.log(toggleNumber)
   });
  };