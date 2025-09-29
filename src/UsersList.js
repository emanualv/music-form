import React, { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get_users.php")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} — {u.email} — {u.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
