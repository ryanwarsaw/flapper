var ticksPerSecond = 60;
var pipePositions = {};
var leadingIndex = 1;

var applyGravity = true;

var gameTickLoop = setInterval(function() {
  renderPipeUpdate();
  cleanUp();
  renderGravityUpdate();
}, 1000 / ticksPerSecond);

// clearInterval to stop the gameTickLoop.

var pipeGenerationLoop = setInterval(function() {
  createObstaclePair();
}, 3750);

function callAnimation() {
  // We trigger the animation again by re-adding the class that calls it.
  var character = document.querySelector("#character");
  character.className = "character-jump-animation";
  applyGravity = false;
}

function updateAnimationLocation(currentLocation) {
  var keyframes = findKeyframesRule("jump");
  console.log(keyframes);
  keyframes.deleteRule("100%");
  // TODO: "currentLocation" contains px in its value, we need to remove it.
  // https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframesRule
  keyframes.appendRule(`100% { top: ${currentLocation - 100}px; }`, 0);
}

window.addEventListener("webkitAnimationEnd", function(event) {
  var character = document.querySelector("#character");

  // Get the finished animation state location, and set it permanently.
  // We do this so we can re-run the animation from its finished state instead of the beginning.
  var location = Number.parseInt(window.getComputedStyle(character, null).top.replace("px", ""));
  findCSSRule("#character").style.top = location + "px";

  // We need to update the animation location because it's our new starting point.
  updateAnimationLocation(location);

  // Remove the animation class, so we can re-add it when we want to run it again.
  character.className = "";
  applyGravity = true;
});


function renderGravityUpdate() {
  if (applyGravity) {
    var characterCurrentYAxisValue = Number.parseInt(findCSSRule("#character").style.top.replace("px", ""));
    characterCurrentYAxisValue += 4.5;
    updateAnimationLocation(characterCurrentYAxisValue);
    findCSSRule("#character").style.top = characterCurrentYAxisValue + "px";
  }
}

function renderPipeUpdate() {
  for (var column = 0; column < pipes; column++) {
    var columnId = `#pipe-${column + 1}`;
    var pairByPipeId = document.querySelectorAll(columnId);

    if (pipePositions[columnId] == undefined) {
      pipePositions[columnId] = -300;
    }

    pipePositions[columnId] += 2;

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
