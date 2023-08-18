import React, { useState, useEffect } from 'react';
import Co_header from './Coordinator/Co_header';
import Op_header from './Operator/Op_header';


const My_profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData()
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user'); // Replace '/api/user' with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.role === 'operator' ? <Op_header /> : <Co_header/>}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="mb-2"><strong>User ID:</strong> {user.userId}</p>
          <p className="mb-2"><strong>Username:</strong> {user.username}</p>
          <p className="mb-2"><strong>First Name:</strong> {user.first_name}</p>
          <p className="mb-2"><strong>Last Name:</strong> {user.last_name}</p>
          <p className="mb-2"><strong>Password:</strong> {user.password}</p>
          <p className="mb-2"><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default My_profile;
