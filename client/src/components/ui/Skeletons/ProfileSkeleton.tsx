import { Skeleton } from 'react-daisyui';

type ProfileSkeletonProps = {
  height?: string;
};

function ProfileSkeleton({ height }: ProfileSkeletonProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Skeleton className="w-16 h-16 rounded-full shrink-0"></Skeleton>
        <div className="flex flex-col gap-4 flex-grow">
          <Skeleton className="h-4 w-10/12"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
        </div>
      </div>
      <Skeleton className={`${height || 'h-32'} w-full`}></Skeleton>
    </div>
  );
}

export default ProfileSkeleton;
