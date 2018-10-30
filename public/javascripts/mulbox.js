var charLimit = 32;
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
    var cursor = box.selectionEnd;

    console.log("id:" + id + " chars:" + chars.length + " words:" + words.length);

    // Check if characters exceeds limits
    // TODO: Account for page numbering
    if (chars.length > charLimit) {
      console.log("number of characters exceeded in mulbox id:" + id);
      
      // Determine which characters need to move to the next box
      var move = "";
      var fullWord = true;
      // Special case if the first word exceeds the character limit
      if (words[0].length > charLimit) {
        fullWord = false;
        move = chars.substring(charLimit, chars.length);
      } else {
        // Starting at charLimit back track to previous ' '
        for (var cut = charLimit; cut >= 0; --cut) {
          var char = chars[cut];
          if (char === ' ') {
            move = chars.substring(cut + 1, chars.length);
            break;
          }
        }
      }

      // Trim current box
      console.log("Trim chars:" + chars.length + " move:" + move.length);
      if (fullWord) {
        box.value = chars.substring(0, chars.length - move.length - 1);
      } else {
        box.value = chars.substring(0, chars.length - move.length);
      }

      // Check if next box is available
      var nextid = parseInt(id) + 1;
      if (!checkBox(nextid)) {
        addBox(nextid);
      }
      var next = getBox(nextid);

      if (next.val().length === 0) {
        next.val(move);
      } else {
        next.val(move + " " + next.val());
      }

      // Move cursor
      // Check if cursor is at the end of text area
      if (cursor >= box.value.length) {
        next[0].focus();
        next[0].selectionEnd = move.length;
      } else {
        box.selectionEnd = cursor;
      }
    } else {
      // Check if first word from next box can be brought to the current box
    }
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

    //converts id to base 16 hexadecimal unicode needed for copy function
      function getUniId(id) {
        var idString = String(id);
        var idHex = "";
  
        for (var i = 0; i < idString.length; ++i) {
          idHex += "\\" + idString.charCodeAt(i).toString(16);
        }
  
        return idHex;
      }
    var uniId = getUniId(id);
    // Add a box
    $box = $above.parent(".mulboxWrapper").after(`
      <div class="mulboxWrapper">
        <textarea class="mulbox" id="` + id + `" maxlength="140" rows="10" cols="30" placeholder="Write some shit here! "></textarea>
        <button class="btn btnCopy" data-clipboard-action="copy" data-clipboard-target="#`+ uniId +`">
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
      console.log("ERROR: Multiple mulboxes with id:" + id + " exist");
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