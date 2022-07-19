import { MercatorCoordinate } from "mapbox-gl";

const ShowType = {
  GLTF: 1,
  OBJ: 2,
  COLLADA: 3,
};

export default class Model {
  constructor(map, options) {
    // parameters to ensure the model is georeferenced correctly on the map
    const gltfURL = options.gltfURL;
    const modelOrigin = options.modelOrigin;
    const modelAltitude = options.modelAltitude || 0;
    const modelRotate = options.modelRotate || [Math.PI, Math.PI, 0];
    const modelScale = options.modelScale || [1, 1, 1];
    const onload = options.onload || function () {};
    const onclick = options.onclick || function () {};
    const showType = ShowType.GLTF;
    // const showType = ShowType.OBJ;
    // const showType = ShowType.COLLADA;

    const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    // transformation parameters to position, rotate and scale the 3D model onto the map
    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since the 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    const THREE = window.THREE;

    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    const customLayer = {
      id: options.id,
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        let scene = (this.scene = new THREE.Scene());

        // create two three.js lights to illuminate the model
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        if (showType == ShowType.GLTF) {
          const loader = new THREE.GLTFLoader();
          loader.load(gltfURL, (gltf) => {
            gltf.scene.name = options.id;
            gltf.scene.scale.set(modelScale[0], modelScale[1], modelScale[2]);
            this.scene.add(gltf.scene);
            onload(gltf);

            const onClick = (event) => {
              var mouse = {};
              event.preventDefault();
              //I had to change the changedTouches to point to adapt
              //  to the incoming event object as for me there was no such property
              mouse.x = (event.point.x / window.innerWidth) * 2 - 1;
              mouse.y = -(event.point.y / window.innerHeight) * 2 + 1;

              const camInverseProjection = new THREE.Matrix4().getInverse(
                this.camera.projectionMatrix
              );
              const cameraPosition = new THREE.Vector3().applyMatrix4(
                camInverseProjection
              );
              const mousePosition = new THREE.Vector3(
                mouse.x,
                mouse.y,
                1
              ).applyMatrix4(camInverseProjection);
              const viewDirection = mousePosition
                .clone()
                .sub(cameraPosition)
                .normalize();

              this.raycaster.set(cameraPosition, viewDirection);

              //no change from here on
              var intersects = this.raycaster.intersectObjects(
                scene.children,
                true
              );
              if (intersects.length > 0) {
                onclick(gltf.scene);
              }
            };
            map.on("click", onClick);
          });
        }
        /////// collada
        else if (showType == ShowType.COLLADA) {
          var elf;
          const loadingManager = new THREE.LoadingManager(function () {
            scene.add(elf);
          });
          const loader = new THREE.ColladaLoader(loadingManager);
          loader.load(
            "./examples/models/collada/elf/elf.dae",
            function (collada) {
              elf = collada.scene;
            }
          );
        }
        /////// obj mtl dds
        else if (showType == ShowType.OBJ) {
          const manager = new THREE.LoadingManager();
          manager.addHandler(/\.dds$/i, new THREE.DDSLoader());
          const onProgress = function (xhr) {
            if (xhr.lengthComputable) {
              const percentComplete = (xhr.loaded / xhr.total) * 100;
              console.log(Math.round(percentComplete, 2) + "% downloaded");
            }
          };
          const onError = function () {};
          new THREE.MTLLoader(manager)
            .setPath("./examples/models/obj/male02/")
            .load("male02_dds.mtl", function (materials) {
              materials.preload();
              new THREE.OBJLoader(manager)
                .setMaterials(materials)
                .setPath("./examples/models/obj/male02/")
                .load(
                  "male02.obj",
                  function (object) {
                    object.position.y = -95;
                    scene.add(object);
                  },
                  onProgress,
                  onError
                );
            });
        }

        this.map = map;

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });

        this.renderer.autoClear = false;
        this.raycaster = new THREE.Raycaster();
      },
      render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale * 5,
              -modelTransform.scale * 5,
              modelTransform.scale * 5
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };

    map.addLayer(customLayer, "boundary_3");
  }
}
