const inFlight = new Map();

// If an identical call is already running, share it instead of sending a second request.
// React StrictMode mounts every component twice in development, which used to call each API twice.
export default function once(key, start) {
  if (!inFlight.has(key)) {
    inFlight.set(key, start().finally(() => inFlight.delete(key)));
  }
  return inFlight.get(key);
}
