import { useState, useEffect } from 'react';
import { createCourse, getCourses, deleteCourse } from '../../services/courseService';
import { Trash2, ExternalLink, Plus, BookOpen } from 'lucide-react';

export default function CourseManagement() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        courseLink: '',
        department: 'All'
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.courseLink) {
            alert('Please fill required fields');
            return;
        }

        const result = await createCourse(formData);
        if (result.success) {
            alert('Course Added Successfully!');
            setShowForm(false);
            setFormData({ title: '', description: '', courseLink: '', department: 'All' });
            loadCourses();
        } else {
            alert('Failed: ' + result.error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            const result = await deleteCourse(id);
            if (result.success) {
                loadCourses();
            } else {
                alert('Failed to delete');
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
                    <p className="text-gray-600">Share learning resources with students</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <Plus size={20} />
                    {showForm ? 'Cancel' : 'Add Course'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Course</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="e.g. Full Stack Web Development"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Target Department</label>
                                <select
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="All">All Departments</option>
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="ME">ME</option>
                                    <option value="IT">IT</option>
                                    <option value="EEE">EEE</option>
                                    <option value="RAI">RAI</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Link (URL)</label>
                            <input
                                type="url"
                                value={formData.courseLink}
                                onChange={(e) => setFormData({ ...formData, courseLink: e.target.value })}
                                className="w-full p-2 border rounded-md"
                                placeholder="https://..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full p-2 border rounded-md"
                                rows="3"
                                placeholder="Briefly describe what students will learn..."
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                            >
                                Post Course
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10">Loading courses...</div>
            ) : courses.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-500 text-lg">No courses posted yet.</p>
                    <p className="text-gray-400 text-sm">Click "Add Course" to share materials.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <div key={course.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                            <div className="p-5 flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-xs px-2 py-1 rounded-full ${course.department === 'All' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                        } font-medium`}>
                                        {course.department}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="text-gray-400 hover:text-red-500"
                                        title="Delete Course"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{course.description}</p>
                            </div>

                            <div className="p-4 border-t bg-gray-50 mt-auto flex justify-between items-center rounded-b-lg">
                                <span className="text-xs text-gray-500">
                                    {course.createdAt?.seconds ? new Date(course.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                                </span>
                                <a
                                    href={course.courseLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    View Link <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
