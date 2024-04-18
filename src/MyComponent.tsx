 // import React, { useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useIsomorphicEffect } from '@mantine/hooks';


// gsap.registerPlugin(ScrollTrigger);

// function MyComponent() {
//   const pathRef = useRef(null);

//   useIsomorphicEffect(() => {
//     const pathLength = pathRef.current.getTotalLength();
//     console.log(pathRef);

//     gsap.set(pathRef.current, {
//       strokeDasharray: pathLength,
//       strokeDashoffset: pathLength,
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: pathRef.current,
//         start: 'top center',
//         end: 'bottom center',
//         scrub: true,
//         pin: true,
//       },
//     });

//     tl.to(pathRef.current, {
//       strokeDashoffset: 0,
//       duration: 3,
//     });
//   }, [pathRef]);

//   return (
//     <svg
//       width="3370"
//       height="671"
//       viewBox="0 0 3370 671"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         ref={pathRef}
//         d="M0.998047 1C0.998047 1 849.498 764.605 786.498 659.553C723.498 554.5 1725.51 370.052 1660.51 419.052C1595.5 468.052 2515.02 616.409 2491.26 660.981C2467.5 705.553 3369 419.052 3369 419.052"
//         stroke="#B1DD40"
//         strokeWidth="3"
//       />
//     </svg>
//   );
// }

// export default MyComponent;