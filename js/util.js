/**
 * Searches the first loaded style sheet for an @keyframes animation by name.
 * FYI: If you use "to" or "from" they'll get converted to percentage values, so use them for manipulating rules.
 * Source (Optimized for flapper): http://jsfiddle.net/russelluresti/RHhBz/3/.
 **/
function findKeyframesRule(name) {
  for (var x = 0; x < document.styleSheets.length; x++) {
    var stylesheet = document.styleSheets[x];
    for (var i = 0; i < stylesheet.cssRules.length; i++) {
      var rule = stylesheet.cssRules[i];
      if (rule.name == name) {
        return rule;
      }
    }
  }
  return null;
}

/**
 * Searches the first loaded style sheet for a CSS rule by name.
 **/
 function findCSSRule(name) {
   for (var x = 0; x < document.styleSheets.length; x++) {
     var stylesheet = document.styleSheets[x];
     for (var i = 0; i < stylesheet.cssRules.length; i++) {
       var rule = stylesheet.cssRules[i];
       if (rule.selectorText == name) {
         return rule;
       }
     }
   }
   return null;
 }
