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
      // The space bar was pressed, we need to call a Jump event.
      break;
    case "Escape":
      // "esc" key was pressed, handle event accordingly.
      createObstaclePair();
      break;
    default:
      return;
  }

  event.preventDefault();
}, true);
