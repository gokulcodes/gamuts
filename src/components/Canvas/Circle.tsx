// import Konva from "konva";
// import { useEffect } from "react";

// const CircleGrid = ({
//   layerRef,
//   rows = 50,
//   cols = 50,
//   spacing = 50,
//   radius = 1,
// }) => {
//   useEffect(() => {
//     if (layerRef?.current) {
//       const layer = layerRef.current;
//       layer.destroyChildren(); // Clear previous shapes

//       for (let row = 0; row < rows; row++) {
//         for (let col = 0; col < cols; col++) {
//           const x = col * spacing + spacing / 2;
//           const y = row * spacing + spacing / 2;

//           const circle = new Konva.Circle({
//             x,
//             y,
//             radius,
//             fill: "white",
//             opacity: 0.2,
//           });

//           layer.add(circle);
//         }
//       }

//       layer.draw();
//     }
//   }, [layerRef, rows, cols, spacing, radius]);

//   return null;
// };

// export default CircleGrid;
