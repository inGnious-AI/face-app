import { useEffect, useMemo, useState, memo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import "animate.css";
import { useSelector, useDispatch } from "react-redux";
import { SoftShadows } from "@react-three/drei";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { TextureLoader, MeshStandardMaterial } from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { FALSE_BACKGROUND } from '../common/constants.js';


const FinalScene = memo(
  ({
    setCanvasLoading,
    texturesList

  }) => {
    const { gl } = useThree();

    SoftShadows({
      size: 16,
      focus: 2,
      samples: 16,
    });

    useEffect(() => {
      gl.toneMappingExposure = 1.0; // Increase or decrease the exposure
    }, [gl]);



    const [proModel, setProModel] = useState(null);

    const dispatch = useDispatch();



    const { tshirtSize } = useSelector((state) => state.tshirtSize);

    const targetModelState = useSelector((state) => state.targetModel);
    const { target: targetModel } = targetModelState;
    const { product: productModel } = useSelector(
      (state) => state.productModel
    );

    const { avatar } = useSelector((state) => state.avatarModelDetails);

    THREE.Cache.enabled = true;
    // const loader = new GLTFLoader();
    const loader = new OBJLoader();


    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://protal-web-assest.s3.ap-south-1.amazonaws.com/Dump/draco/"
    );
    dracoLoader.setDecoderConfig({ type: "js" });

    // const loaderDraco = new GLTFLoader();
    // loaderDraco.setDRACOLoader(dracoLoader);

    THREE.ColorManagement.enabled = true;

    const textureLoader = new THREE.TextureLoader();

    const bgModel = useLoader(
      GLTFLoader,
      FALSE_BACKGROUND
    );

    // product textures
    const productBaseMap = useLoader(
      TextureLoader,
      "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Blue+line+polo+t-shirt/Blur_line_Base_color.jpg"
    );

    productBaseMap.colorSpace = THREE.SRGBColorSpace;

    const productNormal = useLoader(TextureLoader, "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Blue+line+polo+t-shirt/Blur_line_Normal_OpenGL.jpg");

    const productMetallic = useLoader(
      TextureLoader,
      "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Blue+line+polo+t-shirt/Blur_line_Metallic.jpg"
    );

    productMetallic.repeat.set(1, 1);

    const productRoughness = useLoader(
      TextureLoader,
      "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Blue+line+polo+t-shirt/Blur_line_Roughness.jpg"
    );

    productRoughness.repeat.set(1, 1);


    useEffect(() => {
      const bodyType = localStorage.getItem("body-type") || "male";
      const url = `https://continuous-tshirt.s3.ap-south-1.amazonaws.com/faceless_app/${avatar.modelId}/body_uploads/${bodyType}/preview.obj`;

      loader.load(
        url,
        model => {
          const wrapper = new THREE.Group();
          wrapper.rotation.y = -Math.PI / 4;
          wrapper.add(model);

          dispatch({
            type: "GET_TARGET_DETAILS_SUCCESS",
            payload: wrapper,
          });
        },
        undefined,
        error => {
          dispatch({
            type: "GET_TARGET_DETAILS_FAIL",
            payload: error,
          });
        }
      );

      return () => {
        if (!targetModel) return;
        disposeModels(targetModel.scene ?? targetModel);
        dispatch({
          type: "GET_TARGET_DETAILS_SUCCESS",
          payload: null,
        });
      };
    }, [avatar]);


    // Loading Product Model

    // useEffect(() => {
    //   loader.load(
    //     `https://continuous-tshirt.s3.ap-south-1.amazonaws.com/faceless_app/test/${avatar.modelId}/cloth_uploads/custom_polo_${avatar.heightId}_${avatar.weightId}_${tshirtSize}.obj?date=${new Date().getTime()}`,
    //     function (model) {
    //       model.traverse((node) => {
    //         if (node.isMesh) {
    //           node.castShadow = true;
    //           node.receiveShadow = true;
    //         }
    //       });

    //       // console.log(model);

    //       model.children[0].material = new THREE.MeshPhysicalMaterial({
    //         map: productBaseMap,
    //         normalMap: productNormal,
    //         metalnessMap: productMetallic,
    //         roughnessMap: productRoughness,
    //         side: THREE.DoubleSide,
    //       });

    //       setProModel(model);

    //       dispatch({
    //         type: "GET_PRODUCT_DETAILS_SUCCESS",
    //         payload: model,
    //       });
    //     },
    //     function (error) {
    //       dispatch({
    //         type: "GET_PRODUCT_DETAILS_FAIL",
    //         payload: error,
    //       });
    //     }
    //   );

    //   return () => {
    //     if (!productModel) return;
    //     disposeModels(productModel.scene);
    //     dispatch({
    //       type: "GET_PRODUCT_DETAILS_SUCCESS",
    //       payload: null,
    //     });
    //   };
    // }, [avatar, tshirtSize]);

    useMemo(() => {


      if (!texturesList && proModel == null) return;

      if (proModel) {
        // console.log(proModel)

        let base = textureLoader.load(
          texturesList.base
        );
        base.colorSpace = THREE.SRGBColorSpace;

        let normal = textureLoader.load(
          texturesList.normal
        );

        let metallic = textureLoader.load(
          texturesList.metallic
        );

        let roughness = textureLoader.load(
          texturesList.roughness
        );

        proModel.children[0].material = new THREE.MeshPhysicalMaterial({
          map: base,
          normalMap: normal,
          metalnessMap: metallic,
          roughnessMap: roughness,
          side: THREE.DoubleSide,
        });
      }

    }, [texturesList, proModel])

    const disposeModels = (model) => {
      if (!model) return;

      model?.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                if (mat.map) mat.map.dispose();
                if (mat.lightMap) mat.lightMap.dispose();
                if (mat.aoMap) mat.aoMap.dispose();
                if (mat.emissiveMap) mat.emissiveMap.dispose();
                if (mat.bumpMap) mat.bumpMap.dispose();
                if (mat.normalMap) mat.normalMap.dispose();
                if (mat.displacementMap) mat.displacementMap.dispose();
                if (mat.roughnessMap) mat.roughnessMap.dispose();
                if (mat.metalnessMap) mat.metalnessMap.dispose();
                if (mat.alphaMap) mat.alphaMap.dispose();
                if (mat.specularMap) mat.specularMap.dispose();
                mat.dispose();
              });
            } else {
              if (child.material.map) child.material.map.dispose();
              if (child.material.lightMap) child.material.lightMap.dispose();
              if (child.material.aoMap) child.material.aoMap.dispose();
              if (child.material.emissiveMap)
                child.material.emissiveMap.dispose();
              if (child.material.bumpMap) child.material.bumpMap.dispose();
              if (child.material.normalMap) child.material.normalMap.dispose();
              if (child.material.displacementMap)
                child.material.displacementMap.dispose();
              if (child.material.roughnessMap)
                child.material.roughnessMap.dispose();
              if (child.material.metalnessMap)
                child.material.metalnessMap.dispose();
              if (child.material.alphaMap) child.material.alphaMap.dispose();
              if (child.material.specularMap)
                child.material.specularMap.dispose();
              child.material.dispose();
            }
          }
        }
      });
      delete model.scene;
      dracoLoader.dispose();
    };

    useEffect(() => {
      if (bgModel) {
        dispatch({
          type: "SET_BACKGROUND_SUCCESS",
          payload: bgModel,
        });
      }
    }, [dispatch, bgModel]);

    useMemo(() => {
      if (!productModel && !targetModel && !bgModel) return;

      if (targetModel) {
        targetModel.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });


        bgModel.scene.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;

            node.material = new MeshStandardMaterial({
              color: "#fff",
            });

            node.material.needsUpdate = true;
          }
        });

      }
    }, [targetModel, productModel]);

    useEffect(() => {
      if (!targetModel && !productModel) {
        setTimeout(() => {
          setCanvasLoading(false);
        }, 1000);
      } else {
        setCanvasLoading(true);
      }
    }, [targetModel, productModel]);

    return (
      <>
        {bgModel && (
          <primitive object={bgModel.scene} position={[0, 0.01, 0]} />
        )}

        {targetModel && <primitive object={targetModel} />}
        {proModel && <primitive object={proModel} />}



      </>
    );
  }
);

export default FinalScene;
