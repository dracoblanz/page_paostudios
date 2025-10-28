import * as htmlToImage from 'html-to-image'
export async function captureNodeAsPng(node, filename = `equipos_${Date.now()}.png`) {
  const dataUrl = await htmlToImage.toPng(node, { pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
