/* eslint-disable react/no-unknown-property */
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Perf } from "r3f-perf";
import WardrobeGroup from "./wardrobeGroup";
import Config from "../../config";
// import { extend } from "@react-three/fiber"
import React from "react";
// import { SAOPass } from "three-stdlib"
import { EffectComposer, N8AO } from "@react-three/postprocessing";

// extend({ SAOPass })
// import { BlendFunction, Effect } from "postprocessing"
// import { SSAO } from "@react-three/postprocessing"

const R3F = React.memo(function R3F() {
  // const { camera, scene, size } = useThree()

  // useEffect(() => {
  //   // passRef.current.
  // }, [size])
  return (
    <>
      <Perf position="top-right" />
      {/* <color args={["ivory"]} attach="background" /> */}

      {/* <SoftShadows size={10} focus={0.3}/> */}

      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={30} />

      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2}
        enabled={false}
        enableDamping={false}
        // enablePan={false}
        makeDefault
        // minDistance={3}
        maxDistance={10}
      />

      {/* <fog attach="fog" args={["white", 0, 40]} /> */}

      <directionalLight
        // SUN
        position={[-1.5, 2, 3]}
        intensity={5.85}
        color={"#f5efe8"}
        shadow-normalBias={0.0265}
        shadow-bias={0.000045}
        // mapSize
        castShadow
        shadow-mapSize={[1024, 1024]}
        // shadow-camera-near={1}
        // shadow-camera-far={10}
        // shadow-camera-top={5}
        // shadow-camera-right={5}
        // shadow-camera-bottom={-5}
        // shadow-camera-left={-5}
      />

      <ambientLight
        // SKY
        intensity={0.925}
        color={"#cad8f1"}
        //castShadow
        //shadow-mapSize={[1024, 1024]}
        // shadow-camera-near={1}
        // shadow-camera-far={10}
        // shadow-camera-top={5}
        // shadow-camera-right={5}
        // shadow-camera-bottom={-5}
        // shadow-camera-left={-5}
      />

      {/* <pointLight
        position={[0, 0, depth / 100 + 1]}
        color="white"
        intensity={3}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={1000}
        shadow-camera-top={500}
        shadow-camera-right={500}
        shadow-camera-bottom={-500}
        shadow-camera-left={-500}
      /> */}

      {/* <ambientLight intensity={0.3} /> */}

      <WardrobeGroup />

      {/* <Environment preset="city"/> */}
      <Environment
        files="/images/env/01.hdr"
        backgroundIntensity={0.5}
        environmentIntensity={1.25}
      />

      {/* <Effects
        multisamping={0}
        renderIndex={1}
        disableGamma={false}
        disableRenderPass={false}
        disableRender={false}
        
      >
        <sAOPass
          attachArray="passes"
          args={[scene, camera, false, true]}
          params-saoIntensity={0.01}
          output={SAOPass.OUTPUT.SAO}
          params-saoBlur
          params-saoBlurRadius={60}
          //  params-saoBlurDepthCutoff={0.1}
          params-saoBlurStdDev={11}
          params-saoKernelRadius={100}
          params-saoScale={2}
          params-saoBias={0.1}
        />
      </Effects> */}
      {/* <EffectComposer enableNormalPass={false} multisampling={0}>
        
      </EffectComposer> */}

      <EffectComposer enableNormalPass={false}>
        <N8AO aoRadius={0.15} distanceFalloff={0.85} intensity={0.75} />
      </EffectComposer>
    </>
  );
});

// eslint-disable-next-line react-refresh/only-export-components
export default R3F;

// import React from "react";
// import { Perf } from "r3f-perf";
// import WardrobeGroup from "./wardrobeGroup";

// import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";

// const R3F = React.memo(function R3F() {
//   return (
//     <>
//       <Perf position="bottom-right" />

//       <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={30} />

//       <OrbitControls
//         maxPolarAngle={Math.PI / 2}
//         maxAzimuthAngle={Math.PI / 2}
//         minAzimuthAngle={-Math.PI / 2}
//         enabled={false}
//         enableDamping={false}
//         makeDefault
//         maxDistance={10}
//       />

//       <directionalLight
//         position={[-1.5, 2, 3]}
//         intensity={5.85}
//         color={"#f5efe8"}
//         shadow-normalBias={0.0265}
//         shadow-bias={0.000045}
//         castShadow
//         shadow-mapSize={[1024, 1024]}
//       />

//       <ambientLight intensity={0.925} color={"#cad8f1"} />

//       <WardrobeGroup />

//       <Environment
//         files="/images/env/01.hdr"
//         backgroundIntensity={0.5}
//         environmentIntensity={1.25}
//       />
//     </>
//   );
// });

// // eslint-disable-next-line react-refresh/only-export-components
// export default R3F;
