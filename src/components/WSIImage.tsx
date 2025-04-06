import React, { useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import data from "../data/output.json";
import {Minus, Plus, RotateCcw} from 'lucide-react';

interface ZoomPanImageWithHubProps {
  imageUrl: string;
  width?: number | string;
  height?: number | string;
  hubSize?: number;
}

const WSIImage: React.FC<ZoomPanImageWithHubProps> = ({
  imageUrl,
  hubSize = 200,
}) => {
  const wrapperRef = useRef<ReactZoomPanPinchRef | null>(null);

  const [viewport, setViewport] = useState({
    scale: 1,
    positionX: 0,
    positionY: 0,
  });

  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNaturalSize({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
  };

  const hubScale =
    naturalSize.width && naturalSize.height
      ? hubSize / naturalSize.width
      : 0.002;

  const visibleBox = {
    width: (hubSize) / viewport.scale,
    height: (naturalSize.height * hubScale) / viewport.scale,
    left: (-viewport.positionX * hubScale),
    top: (-viewport.positionY * hubScale) / viewport.scale,
  };

  const getBoundingBoxes = () => {
    try {
      const fixedResults = data.inference_results.replace(/'/g, '"');
      const output = JSON.parse(fixedResults).output;
      const detections = output.detection_results;

      return detections.map((det: any, i: number) => {
        const [x1, y1, x2, y2] = det;
        return (
          <div
            key={i}
            className="absolute border-2 border-blue-700"
            style={{
              left: `${x1}px`,
              top: `${y1}px`,
              width: `${x2 - x1}px`,
              height: `${y2 - y1}px`,
            }}
          />
        );
      });
    } catch (err) {
      console.error("Error parsing bounding boxes:", err);
      return null;
    }
  };

  return (
    <div className="relative w-full h-auto py-10 ">
      <TransformWrapper
        ref={wrapperRef}
        initialScale={1}
        minScale={0.9}
        maxScale={5}
        wheel={{ step: 0.1 }}
        panning={{ velocityDisabled: true }}
        doubleClick={{ mode: "reset" }}
        onTransformed={({ state }) => {
          setViewport({
            scale: state.scale,
            positionX: state.positionX,
            positionY: state.positionY,
          });
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className="">
            <div className="absolute z-30 flex bottom-12 w-full justify-center">
              <div className="rounded px-4 py-3 border-gray-200 border-2 flex gap-3 bg-gray-100 shadow-2xl [&>button]:w-10 [&>button]:h-10 [&>button]:bg-blue-500 [&>button]:text-white [&>button]:rounded [&>button:hover]:bg-blue-600 [&>button]:grid [&>button]:place-items-center">
                <button
                  onClick={() => zoomIn()}
                >
                  <Plus/>
                </button>
                <button
                  onClick={() => zoomOut()}
                >
                  <Minus/>
                </button>
                <button
                  onClick={() => resetTransform()}
                >
                  <RotateCcw/>
                </button>
              </div>
            </div>

            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
              <div className="relative w-full">
                <img
                  src={imageUrl}
                  alt="Zoomable"
                  onLoad={handleImageLoad}
                  className="w-full h-auto block"
                />
                {getBoundingBoxes()}
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>

      {/* Mini-map Hub */}
      {naturalSize.width > 0 && (
        <div
          className="absolute border border-gray-400 overflow-hidden bg-white p-2 rounded-xl"
          style={{
            top: 10,
            right: 10,
            width: hubSize,
            height: "auto",
          }}
        >
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt="Mini"
              className="block border-2"
              style={{
                width: naturalSize.width * hubScale,
                height: naturalSize.height * hubScale,
              }}
            />
            <div
              className="absolute border-2 border-red-500 pointer-events-none"
              style={{
                width: visibleBox.width,
                height: visibleBox.height,
                left: visibleBox.left,
                top: visibleBox.top,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WSIImage;
