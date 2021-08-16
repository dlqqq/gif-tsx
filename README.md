# `gif-tsx`

A simple TypeScript-first React GIF player library. Ships with best practices like:

- ESM module specification for tree-shaking

- Strict type-checking

`gif-tsx` offers total flexibility when it comes to writing a GIF player
component. Because controls are exposed via a reusable hook, the consumer is
given complete creative freedom when it comes to defining what the GIF player
should do and how it should look.

## Install

Install with your choice of package manager.

### NPM

```
npm install gif-tsx --save
```

### Yarn

```
yarn add gif-tsx
```

## Getting started

The `useGifController` hook is the core of this library, and returns a **GIF
controller** bound to a canvas element which plays a GIF.

Let's start by writing a basic `GifPlayer` component. We will first need to
import our dependencies:

```tsx
import React, { useRef } from "react";
import { useGifController } from "gif-tsx";
```

And then, we need to provide two things.

1. A URL to load our GIF from.

2. A ref to a `canvas` element that will be rendered after we load our GIF.

To load a custom GIF (i.e. not one served remotely), you must add the GIF to
your `public/` directory which is configured by your bundler (e.g. Webpack,
Snowpack, or Vite). If you are using Vite, it is as simple as moving your GIF to
the `public/` directory at the project root.

Then, we handle the `error`, `loading`, and `resolved` states accordingly, and
we're all good to go!

```tsx
function GifPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controller = useGifController("/earth.gif", canvasRef);

  // handle loading state
  if (controller.state === "loading") {
    // `controller` has type `GifControllerLoading`
    return null;
  }

  // handle error state
  if (controller.state === "error") {
    // `controller` has type `GifControllerError`
    console.error(controller.errorMessage);
    return null;
  }

  // `controller` has type `GifControllerResolved`
  const { canvasProps, play, pause } = controller;

  return (
    <div>
      <canvas {...canvasProps} ref={canvasRef} />
      <button alt="play" onClick={play} />
      <button alt="pause" onClick={pause}>
    </div>
  );
}
```

## API

### `useGifController`

The `useGifController` hook accepts 3 parameters:

- `url: string` -- The URL of the GIF to play. This can be a local or remote
  URL. For example, it can be `/earth.gif` if `earth.gif` is served by the local
  server, or `https://foo.bar/earth.gif` if `earth.gif` is served by `foo.bar`.

- `canvasRef: React.RefObject<HTMLCanvasElement>` -- A ref bound to the `canvas`
  element returned in the resolved state.

- `autoplay: boolean = false` (optional, defaults to `false`) -- Whether to
  begin playing the GIF as soon as the GIF resolves.

`useGifController` has 3 possible states, exposed by the `GifController.state`
property.

- `loading`: The GIF is currently being fetched and processed.

- `error`: There was an error fetching or processing the GIF. The GIF controller
  exposes an error message on `GifController.errorMessage`.

- `resolved`: The GIF was fetched and processed successfully. The GIF player
  controls are only exposed in this state.

The component calling `useGifController` should handle the states separately.
Assuming you've handled the `loading` and `error` states accordingly, the
following controls are exposed by the GIF controller.

- `canvasProps: HTMLCanvasElementProps` -- Props to pass to the `canvas`
  element. Includes the ideal `width` and `height`.

- `playing: boolean` -- Whether the GIF is currently playing.

- `play: () => void` -- Callback which begins playing the GIF.

- `pause: () => void` -- Callback which pauses the GIF.

- `restart: () => void` -- Callback which resets the GIF back to the first
  frame. Does not affect playback state.

- `frameIndex: number` -- The current frame, 0-indexed.

- `renderFrame: (frameIndex: number) => void` -- Callback which accepts an
  argument `frameIndex: number` that renders the frame at frame index `frameIndex`.

- `renderNextFrame: () => void` -- Callback which renders the next frame of the
  GIF.

- `renderPreviousFrame: () => void` -- Callback which renders the previous frame
  of the GIF.

- `width: number` -- Width of the loaded GIF.

- `height: number` -- Height of the loaded GIF.

## License

MIT. See `LICENSE` file in project root.
