# `gif-tsx`

A TypeScript-first React GIF player library.

## API

### `useGifController`

#### Example

```tsx
import { useRef } from "react";
import { useGifController } from "gif-tsx";

const canvasRef = useRef<HTMLCanvasElement>(null);
const controller = useGifController("/earth.gif", canvasRef);

return (
  <div>
    <canvas ref={canvasRef} />
  </div>
);
```
