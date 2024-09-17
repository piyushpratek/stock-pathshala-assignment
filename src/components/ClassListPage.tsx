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
    return <ShimmerEffect />;
  }

  return (
    <div>
      <h1>Live Classes</h1>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem.id}>
            <img src={classItem.image} alt={classItem.title} />
            <h3>{classItem.title}</h3>
            <p>{classItem.start_datetime}</p>
            <p>{classItem.teachers.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassListPage;
