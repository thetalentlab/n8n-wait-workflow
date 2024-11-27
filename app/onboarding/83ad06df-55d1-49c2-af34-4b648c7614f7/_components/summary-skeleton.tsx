import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../../../../components/ui/button";

const SummarySkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-4 gap-4 animate-pulse">
      {/* Title */}
      <Card className="border shadow-lg col-span-4">
        <CardHeader>
          <CardTitle className="h-6 bg-gray-300 rounded w-1/3"></CardTitle>
          <CardDescription className="h-2 bg-gray-200 rounded w-2/3 mt-2"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card className="border shadow-lg col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle className="h-6 bg-gray-300 rounded w-1/3"></CardTitle>
          <CardDescription className="h-2 bg-gray-200 rounded w-2/3 mt-2"></CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex gap-2 flex-wrap">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index} className="h-5 w-16 bg-gray-200 rounded"></li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Learning Goal */}
      <Card className="border shadow-lg col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle className="h-6 bg-gray-300 rounded w-1/3"></CardTitle>
          <CardDescription className="h-2 bg-gray-200 rounded w-2/3 mt-2"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-2 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-2 bg-gray-300 rounded w-full"></div>
        </CardContent>
      </Card>

      {/* Selected Topics */}
      <Card className="border shadow-lg lg:col-span-2 col-span-4">
        <CardHeader>
          <CardTitle className="h-6 bg-gray-300 rounded w-1/3"></CardTitle>
          <CardDescription className="h-2 bg-gray-200 rounded w-2/3 mt-2"></CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="pl-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <li
                key={index}
                className="h-3 bg-gray-200 rounded w-full mt-3"
              ></li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Selected Questions */}
      <Card className="border shadow-lg lg:col-span-2 col-span-4">
        <CardHeader>
          <CardTitle className="h-6 bg-gray-300 rounded w-1/3"></CardTitle>
          <CardDescription className="h-2 bg-gray-200 rounded w-2/3 mt-2"></CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="pl-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <li
                key={index}
                className="h-3 bg-gray-200 rounded w-full mt-3"
              ></li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Time */}
      <Card className="border shadow-lg col-span-4">
        <CardHeader>
          <CardTitle className="h-6 bg-gray-300 rounded w-1/3"></CardTitle>
          <CardDescription className="h-2 bg-gray-200 rounded w-2/3 mt-2"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </CardContent>
      </Card>
      <Button className="col-start-4 bg-gray-300 text-transparent hover:bg-gray-300"></Button>
    </div>
  );
};

export default SummarySkeleton;
