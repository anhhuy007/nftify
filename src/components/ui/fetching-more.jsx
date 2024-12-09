import Lottie from "react-lottie";
import fetchingMoreAnimation from "@/assets/animations/fetching-more.json";

export default function FetchingMoreAnimation() {
  return (
    // loading animation from lottiefiles
    <div className="flex items-center justify-center">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: fetchingMoreAnimation,
        }}
        height={100}
        width={400}
      />
    </div>
  );
}
