var charLimit = 10;
/* w/o jQuery window.onload=function()
  .ready waits for the DOM to be fully loaded
*/
$(document).ready(function() {
  // mulbox key listener
  $("#mulboxes").on("input", ".mulbox", function(event) {
    var box = event.originalEvent.target;
    var id = box.id;
    var chars = box.value;
    var words = chars.split(" ");

    console.log("id:" + id + " chars:" + chars.length + " words:" + words.length);
  });

  // Add box
  function addBox(id) {
    // Box id 1 should not be altered
    if (id === 1) {
      console.log("ERROR: Attempting to add mulbox with id:" + id);
      return;
    }

    // Get the mulbox
    var $box = checkBox(id);
    var $above = getBox(id - 1);

    if ($above === null) {
      // TODO RECOVERY: Find next above box, change id to above + 1;
      console.log("ERROR: Unable to add mulbox with id:" + id + ", no above mulbox with id:" + (id - 1));

      return null;
    }

    // Check if box exists
    if ($box !== null) {
      // mulbox with id already exists, shift existing boxes down
      var $mulboxes = $(".mulbox");

      for (var i = id; i <= $mulboxes.length; ++i) {
        $mulboxes[i - 1].id = i + 1;
      }
    }

    // Add a box
    $box = $above.parent(".mulboxWrapper").after(`
    <div class="mulboxWrapper">
      <textarea class="mulbox" id="` + id + `" maxlength="140" rows="10" cols="30" placeholder="Write some shit here! "></textarea>
      <button class="btn btnCopy">
        <i class="fas fa-copy"></i>
      </button>
    </div>`);

    return $box;
  }

  // Remove box
  function removeBox(id) {
    // Box id 1 should not be altered
    if (id === 1) {
      console.log("ERROR: Attempting to add mulbox with id:" + id);
      return;
    }

    // Get the mulbox
    var $box = getBox(id);

    if ($box !== null) {
      // Remove parent
      $box.parent(".mulboxWrapper").remove();

      // Shift remaining mulboxes up
      var $mulboxes = $(".mulbox");

      for (var i = id; i <= $mulboxes.length; ++i) {
        $mulboxes[i - 1].id = i;
      }
    }
  }

  function getBox(id) {
    var $box = $("#" + id);

    // Check if box exists
    if ($box.length > 1) {
      // More than one box
      console.log("ERROR: Multitple mulboxes with id:" + id + " exist");
    } else if ($box.length === 0) {
      // No box with id found
      console.log("ABN: Zero mulboxes found with id:" + id + " exists");
    } else {
      return $box;
    }

    // NOK
    return null;
  }

  function checkBox(id) {
    var $box = $("#" + id);

    // Check if box exists
    if ($box.length === 1) {
      return $box;
    }

    return null;
  }

  // Test buttons to add and remove mulboxes
  $("#addBox").click(function(event) {
    var boxes = $(".mulbox").length
    addBox(boxes + 1);
  });

  $("#removeBox").click(function(event) {
    var boxes = $(".mulbox").length
    removeBox(boxes);
  });

  $("#addBox2").click(function(event) {
    var boxes = $(".mulbox").length
    addBox(2);
  });

  $("#removeBox2").click(function(event) {
    var boxes = $(".mulbox").length
    removeBox(2);
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

   var clipboard = new ClipboardJS('.btnCopy');

   
   clipboard.on('success', function(e) {
      console.log(e);
    });

    clipboard.on('error', function(e) {
      console.log(e);
    });


});