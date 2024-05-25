export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function getCookie(name) {
  // Split all cookies into an array
  var cookies = document.cookie.split(";");

  // Loop through the cookies
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];

    // Trim leading and trailing spaces
    cookie = cookie.trim();

    // Check if the cookie starts with the name we're looking for
    if (cookie.indexOf(name + "=") === 0) {
      // Extract and return the cookie value
      return cookie.substring(name.length + 1, cookie.length);
    }
  }

  // Cookie not found
  return null;
}

export function savecookie(name, value) {
  return (document.cookie =
    name + "=" + value + ";" + "expires=" + new Date(2038, 0, 1).toUTCString());
}

export function delete_cookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}
