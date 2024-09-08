import { ImageViewer } from "rosreact";

const Camera1 = () => {  
  return (
    <div
      style={{ width: "300px", height: "480px" }}
      className="outline outline-offset-0 outline-blue-500 relative"
      id="img"
    >
      <ImageViewer
        id="object_detection"
        host="http://192.168.1.103"
        port={8080}
        height={480}
        width={540}
        quality={75}
        topic="/camera/color/image_raw"
      />
    </div>
  );
};

export default Camera1;
