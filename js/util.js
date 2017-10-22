/**
 * Searches the first loaded style sheet for an @keyframes animation by name.
 * FYI: If you use "to" or "from" they'll get converted to percentage values, so use them for manipulating rules.
 * Source (Optimized for flapper): http://jsfiddle.net/russelluresti/RHhBz/3/.
 **/
function findKeyframesRule(name) {
  var stylesheet = document.styleSheets[0];
  for (var i = 0; i < stylesheet.cssRules.length; i++) {
    var cssRule = stylesheet.cssRules[i];
    if (cssRule.name == name) return cssRule;
  }
  return null;
}

/**
 * Searches the first loaded style sheet for a CSS rule by name.
 **/
 function findCSSRule(name) {
   var stylesheet = document.styleSheets[0];
   for (var i = 0; i < stylesheet.cssRules.length; i++) {
     var cssRule = stylesheet.cssRules[i];
     if (cssRule.selectorText == name) return cssRule;
   }
   return null;
 }
