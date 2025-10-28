export function cryptoShuffle(array) {
  const a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const randArr = new Uint32Array(1)
    crypto.getRandomValues(randArr)
    const j = randArr[0] % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
export function clamp(n, min, max) { return Math.min(Math.max(n, min), max) }
