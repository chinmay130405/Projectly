import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function ProjectCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectFeedSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}
