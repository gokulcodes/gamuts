## gamuts

### Requirements:

- Hand Drawing Mode
- Shapes & Put text inside shape
- Infinite Zoom in-out
- Image support
  - Crop, Rounded, borders
  - draw on top of image
  - Invert
  - Rotate
- Text

### Decisions:

- React + Vite
- Canvas / DOM:
  - Canvas is faster
  - Complex to implement everything from scratch
  - DOM will be less efficient and cluttered
  - Let's go with Canvas
