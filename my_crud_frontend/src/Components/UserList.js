import { FaTrash, FaEdit } from "react-icons/fa";


function UserList({ users, deleteUser, updateUser }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">User List</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Action</th>
            <th className="p-2">Name</th>
            <th className="p-2"> Address</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
                 <td className="p-2">
                  <div className="flex gap-3">   
                <button
                  onClick={() => deleteUser(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                   <FaTrash size={18} />
                </button>
                 <button
                  onClick={() => updateUser(u._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                   <FaEdit size={18} />
                </button>
                </div>
                </td>
                
              <td className="p-2">{u.firstName} {u.lastName}</td>
              <td className="p-2">{u.address}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phone}</td>
             
                
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
