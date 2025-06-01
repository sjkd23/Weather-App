// Fetch JSON from a URL, throw with a helpful error message if not OK
export async function fetchJSON(url, { signal } = {}) {
  // Make the HTTP request
  const res = await fetch(url, { signal });
  if (!res.ok) {
    let errMsg = `${res.status} ${res.statusText}`;
    try {
      // Try to extract a more specific error message from the response
      const errData = await res.json();
      if (errData?.message) {
        errMsg = errData.message; // e.g. “city not found”
      }
    } catch {
      // If response is not JSON, just use the status text
    }
    throw new Error(errMsg);
  }
  // Return parsed JSON if successful
  return res.json();
}
