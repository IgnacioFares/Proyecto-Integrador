import { useState, useEffect } from 'react';

const PermissionsManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Error al cargar los usuarios.');
      }
    };

    fetchUsers();
  }, []);

  const handlePermissionChange = async (id, newPermissions) => {
    try {

      await fetch(`/api/users/${id}/permissions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ permissions: newPermissions })
      });


      setUsers(users.map(user => 
        user.id === id ? { ...user, permissions: newPermissions } : user
      ));
    } catch (error) {
      setError('Error al actualizar los permisos.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administrar Permisos</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Nombre</th>
            <th className="py-2">Email</th>
            <th className="py-2">Permisos</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No hay usuarios disponibles.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-2 text-center">{user.id}</td>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.permissions.join(', ')}</td>
                <td className="py-2 text-center">
                  <button
                    className="text-green-700 hover:underline"
                    onClick={() => handlePermissionChange(user.id, ['admin'])}
                  >
                    Asignar Admin
                  </button>
                  <button
                    className="text-red-500 hover:underline ml-4"
                    onClick={() => handlePermissionChange(user.id, ['user'])}
                  >
                    Revocar Admin
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsManagement;