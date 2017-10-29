function createCharacter(id) {
  return {
    /**
     * Internal properties, DO NOT write directly to them, used to maintain internal state.
     **/
    props: {
      applyGravity: true,
      position: -1,
    },

    init: function() {
      // TODO: Make the character visible on the center of the page. This is for the title screen.
    },

    /**
     * Triggers the "jump" animation by appending the animation class to the character element.
     * Temporarily disables gravity effects until the animation is complete (Prevent glitching).
     **/
    jump: function() {
      this.props.applyGravity = false;
      this.createDynamicJumpAnimation();
      document.querySelector(id).className = "character-jump-animation";
    },

    /**
     * Applies "Gravity" to the character body, this method is called every tick by the renderer.
     **/
    applyGravity: function() {
      if (this.props.applyGravity) {
        var newPosition = this.props.position += 4.5;
        this.updatePosition(newPosition);
      }
    },

    /**
     * Shorthand method that updates the internal and external position all at once.
     * Called when processing gravity movement, or end of jump animation event.
     **/
    updatePosition: function(position) {
      var cssRule = findCSSRule("#character");
      this.props.position = position;
      cssRule.style.top = position + "px";
    },

    /**
     * Updates the jump keyframe animation with the new character position.
     * See: https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframesRule.
     **/
    createDynamicJumpAnimation: function() {
      var keyframes = findKeyframesRule("jump");
      keyframes.deleteRule("100%");
      keyframes.appendRule(`100% { top: ${this.props.position - 100}px; }`, 0);
    },
  };
}

/**
 * Triggered when the jump animation has been completed. When it has, we update position.
 * This allows us to create a "relative" animation rather than reset to the same position every time.
 **/
window.addEventListener("webkitAnimationEnd", function(event) {
  // TODO: Filter the animation event, we want the jump end event.
  var el = document.querySelector("#character");
  var endPosition = Number.parseInt(window.getComputedStyle(el, null).top.replace("px", ""));

  character.updatePosition(endPosition);
  character.props.applyGravity = true;
  el.className = "";
});
