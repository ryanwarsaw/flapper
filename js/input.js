/**
 * Listens for keyboard events that we want to react to in our game.
 * We listen for a space bar input, because that's our method of triggering a character jump.
 * We additionally listen for the ESC key input, to toggle the game state between running/paused.
 **/
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  switch(event.key) {
    case "Spacebar", " ":
      if (gameState.props.state !== "running") {
        gameState.setState("running");
      }
      character.jump();
      break;
    case "Escape":
      if (gameState.props.state !== "running") {
        gameState.setState("running");
      } else {
        gameState.setState("paused");
      }
      break;
    default:
      return;
  }

  event.preventDefault();
}, true);
