/**
 * Basically, we're creating a keyboard listener to wait for specific keys to
 * be pressed, and when they are trigger a custom event to manipulate the game.
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
