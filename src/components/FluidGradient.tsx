import { useEffect, useRef } from "react";
import { useFrame, extend, Object3DNode, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

// Define the props for the shader material
type FluidMaterialProps = {
  uTime: number;
  uResolution: THREE.Vector2;
};

// Create the shader material
const FluidMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uResolution: new THREE.Vector2(),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    #define time uTime
    #define iResolution uResolution

    const float arrow_density = 4.5;
    const float arrow_length = .45;
    const int iterationTime1 = 20;
    const int iterationTime2 = 20;
    const int vector_field_mode = 0;
    const float scale = 10.;
    const float velocity_x = 0.1;
    const float velocity_y = 0.2;
    const float mode_2_speed = 2.5;
    const float mode_1_detail = 200.;
    const float mode_1_twist = 50.;
    const bool isArraw = true;

    float f(in vec2 p) {
      return sin(p.x+sin(p.y+time*velocity_x)) * sin(p.y*p.x*0.1+time*velocity_y);
    }

    struct Field {
      vec2 vel;
      vec2 pos;
    };

    Field field(in vec2 p, in int mode) {
      Field field;
      vec2 ep = vec2(0.05,0.);
      vec2 rz = vec2(0);
      for( int i=0; i<iterationTime1; i++ ) {
        float t0 = f(p);
        float t1 = f(p + ep.xy);
        float t2 = f(p + ep.yx);
        vec2 g = vec2((t1-t0), (t2-t0))/ep.xx;
        vec2 t = vec2(-g.y,g.x);
        p += (mode_1_twist*0.01)*t + g*(1./mode_1_detail);
        p.x = p.x + sin( time*mode_2_speed/10.)/10.;
        p.y = p.y + cos(time*mode_2_speed/10.)/10.;
        rz = g;
      }
      field.vel = rz;
      if (mode == 1) {
        for(int i=1; i<iterationTime2; i++){
          p.x+=0.3/float(i)*sin(float(i)*3.*p.y+time*mode_2_speed) + 0.5;
          p.y+=0.3/float(i)*cos(float(i)*3.*p.x + time*mode_2_speed) + 0.5;
        }
      }
      field.pos = p;
      return field;
    }

    vec3 getRGB(in Field fld, in int mode) {
      if(mode == 0){
        vec2 p = fld.vel;
        // vec3 origCol = vec3( p.x*.8 +.4,(p.x*.1+p.y*.1*.1)+.2, p.y +.8);
        vec3 origCol = vec3(p * 0.5 + 0.5, 1.5); 
        // vec3 origCol = vec3(.8,0,0);
        return origCol;
      }
      if(mode == 1){
        vec2 p = fld.pos;
        float r=cos(p.x+p.y+1.)*.5+.5;
        float g=sin(p.x+p.y+1.)*.5+.5;
        float b=(sin(p.x+p.y)+cos(p.x+p.y))*.3+.5;
        vec3 col = sin(vec3(-.3,0.1,0.5)+p.x-p.y)*0.65+0.35;
        return vec3(r,g,b);
      }
      return vec3(0.0);
    }

    void main() {
      vec2 p = vUv - 0.5;
      p.x *= iResolution.x/iResolution.y;
      p *= scale;
      
      int vector_mode = 0;
      Field fld = field(p, vector_mode);
      vec3 col = getRGB(fld, vector_mode) * 0.7;
      
      gl_FragColor = vec4(col, 1.0);
    }
  `
);

// Extend the JSX intrinsic elements to include our custom material
extend({ FluidMaterial });

// Add type declaration for our custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      fluidMaterial: Object3DNode<FluidMaterialProps, typeof FluidMaterial>;
    }
  }
}

function Fluid() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<FluidMaterialProps>(null);
  const { size, viewport } = useThree();

  useEffect(() => {
    if (mesh.current) {
      // Set the mesh to cover the entire viewport
      mesh.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [viewport]);

  useFrame((state) => {
    if (material.current) {
      material.current.uTime = state.clock.elapsedTime;
      material.current.uResolution.set(size.width, size.height);
    }
    if (mesh.current) {
      // Update mesh size if viewport changes
      mesh.current.scale.set(viewport.width, viewport.height, 1);
    }
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <fluidMaterial ref={material} />
    </mesh>
  );
}

const FluidGradient = () => {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,

      }}
      className="filter "
    >
      <Fluid />
    </Canvas>
  );
};

export default FluidGradient;

//  <div style={{ width: "100%", height: "100%" }}>
//         <Canvas style={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}>
//           <FluidGradient />
//         </Canvas>
//       </div>
