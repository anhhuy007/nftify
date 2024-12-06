import Lottie from "react-lottie";
import errorAnimation from "@/assets/animations/error.json";

export default function ErrorAnimation() {
  return (
    // loading animation from lottiefiles
    <div className="flex flex-col items-center justify-center p-5">
      <Lottie 
        options={{
          loop: true,
          autoplay: true,
          animationData: errorAnimation,
        }}
        height={400}
        width={400}
        isStopped={false}
        isPaused={false}
        isClickToPauseDisabled={true}
      />
      <p className="text-2xl font-bold pt-5 text-zinc-300 dark:text-zinc-400">
        Something went wrong. Please try again later.
      </p>
    </div>
  );
}
