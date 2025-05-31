// /* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/no-unsafe-function-type */
// import { useState } from "react";
// import { Group, Rect } from "react-konva";
// import type { Shape } from "../../libs";
// import TextCustom from "./Text";
// export default function GroupRect(props: {
//   struct: Shape;
//   updateRef: Function;
// }) {
//   const { struct, updateRef } = props;
//   const [showText, setShowText] = useState(false);
//   const textStruct: Shape = {
//     x: 0,
//     y: 0,
//     text: "New Text",
//   };
//   console.log(showText);
//   return (
//     <Group x={struct.x} y={struct.y} onDblClick={() => setShowText(!showText)}>
//       {showText && (
//         <TextCustom struct={textStruct} updateRef={(e) => console.log(e)} />
//       )}
//       {/* @ts-expect-error */}
//       <Rect
//         {...struct}
//         x={0}
//         y={0}
//         ref={(node) => {
//           if (node) {
//             updateRef(node);
//           }
//         }}
//       />
//     </Group>
//   );
// }
