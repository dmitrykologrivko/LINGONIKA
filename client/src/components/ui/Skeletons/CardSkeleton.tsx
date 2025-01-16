import { Skeleton } from 'react-daisyui';

type CardSkeletonProps = {
  height?: string;
};

function CardSkeleton({ height }: CardSkeletonProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Skeleton className={`${height || 'h-32'} w-full`}></Skeleton>
      <Skeleton className="h-4 w-7/12"></Skeleton>
      <Skeleton className="h-4 w-full"></Skeleton>
      <Skeleton className="h-4 w-full"></Skeleton>
    </div>
  );
}

export default CardSkeleton;
