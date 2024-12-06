import Lottie from "react-lottie";
import loadingAnimation from "@/assets/animations/loading.json";

export default function LoadingAnimation() {
  return (
    // loading animation from lottiefiles
    <div className="flex items-center justify-center">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: loadingAnimation,
        }}
        height={400}
        width={400}
      />
    </div>
  );
}
