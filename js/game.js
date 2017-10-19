var ticksPerSecond = 60;
var pipePositions = {};
var leadingIndex = 1;

var gameTickLoop = setInterval(function() {
  renderPipeUpdate();
  cleanUp();
}, 1000 / ticksPerSecond);

// clearInterval to stop the gameTickLoop.

function renderPipeUpdate() {
  for (var column = 0; column < pipes; column++) {
    var columnId = `#pipe-${column + 1}`;
    var pairByPipeId = document.querySelectorAll(columnId);

    if (pipePositions[columnId] == undefined) {
      pipePositions[columnId] = 0;
    }

    pipePositions[columnId]++;

    for (var i = 0; i < pairByPipeId.length; i++) {
      pairByPipeId[i].style.right = pipePositions[columnId];
    }
  }
}

/**
 This is a janky implementation for cleaning up pipes once they run off the page.
 **/
function cleanUp() {
  var columnId = `#pipe-${leadingIndex}`;
  if (pipePositions[columnId] > window.innerWidth) {
    var pairByPipeId = document.querySelectorAll(columnId);

    for (var i = 0; i < pairByPipeId.length; i++) {
      pairByPipeId[i].parentNode.removeChild(pairByPipeId[i]);
    }

    pipePositions[`#pipe-${leadingIndex}`] = undefined;
    leadingIndex++;
  }
}
