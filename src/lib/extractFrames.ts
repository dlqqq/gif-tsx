import { GifReader } from 'omggif'

export type Frame = {
  /**
   * A full frame of a GIF represented as an ImageData object. This can be
   * rendered onto a canvas context simply by calling
   * `ctx.putImageData(frame.imageData, 0, 0)`.
   */
  imageData: ImageData
  /**
   * Delay in milliseconds.
   */
  delay: number
}

/**
 * Function that accepts a `GifReader` instance and returns an array of
 * `ImageData` objects that represent the frames of the gif.
 *
 * @param gifReader The `GifReader` instance.
 * @returns An array of `ImageData` objects representing each frame of the GIF.
 * Or `null` if something went wrong.
 */
export function extractFrames(gifReader: GifReader): Frame[] | null {
  const frames: Frame[] = []

  // the width and height of the complete gif
  const { width, height } = gifReader

  // This is the primary canvas that the tempCanvas below renders on top of. The
  // reason for this is that each frame stored internally inside the GIF is a
  // "diff" from the previous frame. To resolve frame 4, we must first resolve
  // frames 1, 2, 3, and then render frame 4 on top. This canvas accumulates the
  // previous frames.
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  for (let frameIndex = 0; frameIndex < gifReader.numFrames(); frameIndex++) {
    // the width, height, x, and y of the "dirty" pixels that should be redrawn
    const { width: dirtyWidth, height: dirtyHeight, x: dirtyX, y: dirtyY, disposal, delay } = gifReader.frameInfo(0)

    // skip this frame if disposal >= 2; from GIF spec
    if (disposal >= 2) continue

    // create hidden temporary canvas that exists only to render the "diff"
    // between the previous frame and the current frame
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = width
    tempCanvas.height = height
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return null

    // extract GIF frame data to tempCanvas
    const newImageData = tempCtx.createImageData(width, height)
    gifReader.decodeAndBlitFrameRGBA(frameIndex, newImageData.data)
    tempCtx.putImageData(newImageData, 0, 0, dirtyX, dirtyY, dirtyWidth, dirtyHeight)

    // draw the tempCanvas on top. ctx.putImageData(tempCtx.getImageData(...))
    // is too primitive here, since the pixels would be *replaced* by incoming
    // RGBA values instead of layered.
    ctx.drawImage(tempCanvas, 0, 0)

    frames.push({
      delay: delay * 10,
      imageData: ctx.getImageData(0, 0, width, height),
    })
  }

  return frames
}
