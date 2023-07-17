import React, { useState } from "react";
import { users } from "../../static.json";

export const UsersPicker = () => {
   return (
      <select>
         <option>Users</option>
         {users.map((u, i) => (
            <option key={i}>{u.name}</option>
         ))}
      </select>
   );
};