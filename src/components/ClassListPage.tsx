import { useEffect, useState } from 'react';
import { fetchClasses } from '../services/api';
import ShimmerEffect from './ShimmerEffect';

interface ClassItem {
  id: number;
  title: string;
  image: string;
  start_datetime: string;
  teachers: {
    name: string;
  };
}

const ClassListPage = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  // console.log('Retrieved token:', token); 

  useEffect(() => {
    const getClasses = async () => {
      if (token) {
        try {
          const response = await fetchClasses(token);

          if (response.data.status === false) {
            console.error('Error fetching classes:', response.data.errors);
          } else {
            const classData = response.data.data.data;
            setClasses(classData);
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching classes', error);
          setLoading(false);

        }
      } else {
        console.error('No token found in localStorage');
        setLoading(false);
      }
    };
    getClasses();
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-3">
        <h1 className='text-bold text-2xl font-extrabold py-3'>Live Classes</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, index) => (
            <li key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
              <ShimmerEffect />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center py-3">
      <h1 className='text-bold text-2xl font-extrabold py-3'>Live Classes</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <li key={classItem.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={classItem.image} alt={classItem.title} />
            <div className="px-6 py-3">
              <div className="font-bold text-xl mb-2 truncate">{classItem.title}</div>
              <p className=" text-green-700 font-bold text-lg">{classItem.start_datetime}</p>
              <p className="text-gray-600 text-xl font-bold ">{classItem.teachers.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassListPage;
