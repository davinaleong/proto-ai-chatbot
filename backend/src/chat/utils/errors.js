// Create readable errors from fetch responses
export async function httpError(res) {
  let body = "";
  try { body = await res.text(); } catch (_) {}
  const summary = body || res.statusText || "Unknown error";
  const err = new Error(`${res.url || "request"} -> ${res.status} ${summary}`);
  err.status = res.status;
  err.body = body;
  return err;
}
