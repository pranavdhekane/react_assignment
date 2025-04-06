import wsiImage from "../assets/wsi-image.png"
import WSIImage from "./WSIImage"
import LeftPanel from "./LeftPanel"
// import ZoomPanImage from "./ZoomPanImageWithHub"

export default function WSI() {
  return (
    <div className="grid lg:flex">
      <div className="w-full flex justify-center lg:w-[25vw]">
        <LeftPanel />
      </div>
      <div className="w-full lg:w-[75vw]">
        <WSIImage imageUrl={wsiImage} />
      </div>
    </div>
  )
}