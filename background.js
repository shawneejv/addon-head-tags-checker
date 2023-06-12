chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'var forbiddenTags = ["TITLE", "BASE", "LINK", "STYLE", "META", "SCRIPT", "NOSCRIPT", "TEMPLATE"]; var foundTags = []; Array.from(document.head.children).forEach(function(element) { if (!forbiddenTags.includes(element.tagName.toUpperCase())) { foundTags.push(element.tagName); } }); chrome.runtime.sendMessage({tags: foundTags});'
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.tags && request.tags.length > 0) {
    var message = "Se encontraron las siguientes etiquetas no permitidas en el head de la página:\n\n";
    request.tags.forEach(function(tag) {
      message += "<" + tag + ">\n";
    });
    alert(message);
  } else {
    alert("No se encontraron etiquetas no permitidas en el head de la página :D ");
  }
});
