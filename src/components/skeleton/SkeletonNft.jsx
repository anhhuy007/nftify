import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonNftCard() {
  return (
    <div className="w-[260px] h-96 p-[2px] rounded-xl bg-card animate-pulse">
      <div className="w-full h-full p-0 bg-card">
        {/* Card Header Skeleton */}
        <div className="px-3 pt-3 pb-0 h-[306px]">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        {/* Card Content Skeleton */}
        <div className="px-3 pt-2 h-[90px]">
          <div className="grid grid-cols-[20%_2%_50%_2%_20%] items-center mt-1">
            {/* Skeleton for Collection Image */}
            <Skeleton circle className="w-11 h-11" />
            <div></div>
            <div className="flex flex-col">
              {/* Skeleton for Collection Name */}
              <Skeleton className="w-[150px] h-4" />
              {/* Skeleton for Title */}
              <Skeleton className="w-3/4 h-5 mt-2" />
            </div>
            <div></div>
            <div className="flex-1 text-right">
              {/* Skeleton for Price */}
              {/* <Skeleton className="w-16 h-5" /> */}
            </div>
          </div>
          {/* Button Skeleton */}
          {/* <Skeleton className="w-full h-10 mt-3 rounded-md" /> */}
        </div>
      </div>
    </div>
  );
}

export function SkeletonBigNftCard() {
  return (
    <div className="w-[330px] h-[480px] p-[2px] rounded-xl bg-card animate-pulse">
      <div className="w-full h-full p-0 bg-card">
        {/* Card Header Skeleton */}
        <div className="px-3 pt-3 pb-0 h-[390px]">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        {/* Card Content Skeleton */}
        <div className="px-3 pt-2 h-[90px]">
          <div className="grid grid-cols-[20%_2%_50%_2%_20%] items-center gap-3">
            {/* Skeleton for Owner Image */}
            <Skeleton circle className="w-12 h-12" />
            <div></div>
            <div className="flex flex-col">
              {/* Skeleton for Owner */}
              <Skeleton className="w-[150px] h-4" />
              {/* Skeleton for Name */}
              <Skeleton className="w-[200px] h-5 mt-2" />
            </div>
            <div></div>
            <div className="flex-1 text-right">
              {/* Skeleton for Price */}
              {/* <Skeleton className="w-[120px] h-5" /> */}
            </div>
          </div>
          {/* Skeleton for Button */}
          {/* <Skeleton className="w-full h-10 mt-3 rounded-md" /> */}
        </div>
      </div>
    </div>
  );
}

export function SkeletonSmallNftCard() {
  return (
    <div className="w-[260px] h-[374px] p-[2px] rounded-xl bg-card animate-pulse">
      <div className="w-full h-full p-0 bg-card">
        {/* Card Header Skeleton */}
        <div className="px-3 pt-5 pb-0 h-[320px]">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        {/* Card Content Skeleton */}
        <div className="px-3 pt-2 h-[90px]">
          <div className="grid grid-cols-[75%_2%_23%] items-center justify-between gap-4">
            {/* Skeleton for Name */}
            <Skeleton className="w-[180px] h-5" />
            <div></div>
            {/* Skeleton for Price */}
            {/* <Skeleton className="w-[100px] h-5" /> */}
          </div>
          {/* Skeleton for Button */}
          {/* <Skeleton className="w-full h-10 mt-3 rounded-md" /> */}
        </div>
      </div>
    </div>
  );
}
