var charLimit = 10;
/* w/o jQuery window.onload=function()
  .ready waits for the DOM to be fully loaded
*/
$(document).ready(function() {
  // mulbox key listener
  $("#mulboxes").keypress(".mulbox", function(event) {
    var box = event.originalEvent.target;
    var id = box.id;
    var chars = box.value;
    var words = chars.split(" ");

    if (event.keyCode === 0) {
      event.preventDefault();
      box.value = chars + event.key;
    }

    var newChars = box.value;
    var newWords = chars.split(" ");

    console.log("id:" + id + " chars:" + newChars.length + " words:" + newWords.length);
  });

  // Add box
  function addBox(id) {
    // Get the next box
    var $box = $("#" + id);

    // Check if box exists
    if ($box.length === 0) {
      // Add a box
      $box = $("#mulboxes").append(`
      <div class="mulboxWrapper">
        <textarea class="mulbox" id="` + id + `" maxlength="140" rows="10" cols="30" placeholder="Write some shit here! "></textarea>
        <button class="btn btnCopy">
          <i class="fas fa-copy"></i>
        </button>
      </div>`); 
    } else if ($box.length > 1) {
      alert("ERROR: Multitple mulboxes with id:" + id + " exist");
    }

    return $box;
  }

  // Remove box
  function removeBox(id) {
    // Get the next box
    var $box = $("#" + id);

    // Check if box exists
    if ($box.length === 1) {
      // Add a box
      $box.parent(".mulboxWrapper").remove();
    } else {
      alert("ERROR: Multitple mulboxes with id:" + id + " exist");
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

// calls the modal
  btnModal.onclick = function() {
    modal.style.display = "block";
  };

// closes the modal
  span.onclick = function() {
    modal.style.display = 'none';
  }
// If user click outside modal it will close
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
// Slider button style

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
});