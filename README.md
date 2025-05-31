## gamuts

A simple tool that lets you sketch diagrams quickly with a hand-drawn feel and then transforms them into polished, professional-looking images perfect

### Requirements:

- Free hand drawing tool
  - Edit options
    - Drawing style
    - Line width
    - color / gradients
- Shapes - Circle, Rectangle, Rounded Rectangle, Pentagon, Hexagon, Lines, Arrows
  - Operations:
    - Reshape
    - Rotate
    - Color change
    - Connect multiple shapes
    - Create shapes while connecting
    - Highlight selected shape
    - Insert text inside the shape
  - Edit options
    - Circle
      - Background color
      - Stroke Color
      - Stroke Style
      - Stroke Width
    - Rectangle / Pentagon / Hexagon
      - Backgorund color
      - Border radius
      - Border style
      - Border width
    - Lines
      - Line color
    - Arrows
      - Arrow head types
      - Color
- Frames

  - Export options - pdf, svg, jpg
  - Group creation

- Text
  - Font style
  - Font color
  - Background color
  - Font size
  - Resize
  - Rotate
- Image
  - Drop images
  - Resize
  - Radius
  - Filters
    - Blur
    - HUE
    - Brighen
    - Invert
    - Saturation
    - Noise
    - Contrast
    - Grayscale
  - Crop
- Infinite Canvas
- Erase
- Delete shapes / selections
- Group selections
- Copy
- Cut
- Paste
- Undo/Redo

- Video editing mode
  - Create a scene
  - Timeline
  - Frame on each time
  - Export - Mp4

Architecture:

- ToolBar

  - Rectangle
  - Circle
  - Polygon
  - Text
  - Line
  - Arrow
  - Pen tool
  - Image
  - Eraser

- Zoomer

  - ZoomOut
  - ZoomIn
  - Percentage

- Export

  - Will be visible on any item selected
  - PDF, SVG, PNG, JPG

- OptionsBar - Visible when any shape is selected inside the canvas

  - Connectors - Helps to create connections between shapes
  - Position will be above the selected object
  - Provides appropriate edit options for the selected item

- Undo/Redo Bar

Data Modal:

- Structures

Interfaces:

Optimization:

### TODO:

- Create shapes using drag - Done
- Import images using drop - Done
- Insert text view
- Insert text inside rect, circle, triangle, shape
- Select multiple object using mouse drag selection
- customization for arrows, lines, pen tool, text
- customize cursor with appropriate tool's image on cursor movement
- implement zoom with react-konva itself. remove another package for infinite zoom
- Shape specific options bar
- keyboard shortcuts
- context menu
