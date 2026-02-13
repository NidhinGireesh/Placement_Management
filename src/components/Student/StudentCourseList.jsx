import { useState, useEffect } from 'react';
import { getCourses } from '../../services/courseService';
import { ExternalLink, BookOpen, PlayCircle } from 'lucide-react';

export default function StudentCourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        setLoading(true);
        const result = await getCourses();
        if (result.success) {
            setCourses(result.courses);
        }
        setLoading(false);
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Learning Courses</h1>
                <p className="text-gray-600">Access curated materials to boost your skills</p>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading learning materials...</div>
            ) : courses.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-500 text-lg">No courses available yet.</p>
                    <p className="text-gray-400 text-sm">Check back later for new materials.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <div key={course.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
                            {/* Card Header with Department Badge */}
                            <div className="p-5 flex-grow">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`text-xs px-2 py-1 rounded-full ${course.department === 'All' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                        } font-medium`}>
                                        {course.department}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                    {course.description}
                                </p>
                            </div>

                            {/* Card Footer with CTA */}
                            <div className="p-4 border-t bg-gray-50 mt-auto rounded-b-lg">
                                <a
                                    href={course.courseLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-blue-600 font-semibold py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                >
                                    <PlayCircle size={18} />
                                    Start Learning
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
