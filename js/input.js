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
      character.jump();
      break;
    case "Escape":
      // TODO: Implement ability to pause the game.
      break;
    default:
      return;
  }

  event.preventDefault();
}, true);
