function findMostRecentProducts() {
  var adl = window.adobeDataLayer || [];
  for (var i = adl.length - 1; i >= 0; i--) {
    var item = adl[i];
    if (!item) { continue; }
    if (item.user && item.user.userdetails && item.user.userdetails.Products !== undefined) {
      var p = item.user.userdetails.Products;
      if (Array.isArray(p)) { return p.slice(); }
      if (p && typeof p === 'object') { return [p]; }
      return [];
    }
    if (item.user && item.user.userdetails && item.user.userdetails['Products[]'] !== undefined) {
      var x = item.user.userdetails['Products[]'];
      if (x && typeof x === 'object') { return [x]; }
    }
  }
  return [];
}

function pushProductUniversal(input) {
  var items = [];
  if (Array.isArray(input)) {
    for (var i = 0; i < input.length; i++) {
      if (input[i] && typeof input[i] === 'object') { items.push(input[i]); }
    }
  } else if (input && typeof input === 'object') {
    items.push(input);
  } else { return; }

  var existing = findMostRecentProducts();
  for (var j = 0; j < items.length; j++) { existing.push(items[j]); }

  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    user: {
      userdetails: {
        Products: existing
      }
    }
  });
}


window.adobeDataLayer = window.adobeDataLayer || [];
window.adobeDataLayer.push({
    event: "pageView",
    page: { name: "Home Page", url: location.href }
});

