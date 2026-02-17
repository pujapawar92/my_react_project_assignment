import { useEffect, useState } from "react";
import axios from "axios";


import AddUser from "../Components/AddUser";
import UserList from "../Components/UserList";
import Header from "../Components/Header";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);


  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };


  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };


  const updateUser = (id) => {
    const user = users.find((u) => u._id === id);
    setEditUser(user);
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>

      <Header />
      <main className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <AddUser  fetchUsers={fetchUsers}
                    editUser={editUser}
                    setEditUser={setEditUser}/>

          <UserList users={users} deleteUser={deleteUser}
           updateUser={updateUser} />
          
        </div>
      </main>
    </>
  );
}

export default HomePage;
