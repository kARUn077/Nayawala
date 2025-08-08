import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetCreatorCourseQuery } from '@/features/api/courseApi';
import { Edit, PlusCircle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CourseTable() {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-10 py-6 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Courses</h2>
        <Button
          onClick={() => navigate('create')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Course
        </Button>
      </div>

      <div className="overflow-auto rounded-lg shadow-md border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a]">
        <Table>
          <TableCaption className="text-sm text-gray-500 dark:text-gray-400">
            A list of your recent courses.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.courses?.length > 0 ? (
              data.courses.map((course) => (
                <TableRow key={course?._id}>
                  <TableCell className="font-medium">
                    ₹{course?.price ?? 'NA'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        course.isPublished
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }
                    >
                      {course.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell>{course?.Title}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`${course._id}`)}
                      className="hover:bg-blue-100 dark:hover:bg-white/10 transition"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500 dark:text-gray-400">
                  You haven’t created any courses yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CourseTable;
