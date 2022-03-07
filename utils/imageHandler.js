import imageCompression from "browser-image-compression"

export default function readAndCompressImage(image) {
  let result = imageCompression(image, {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  }).then(function (compressedFile) {
    return compressedFile
  })

  return result
}
