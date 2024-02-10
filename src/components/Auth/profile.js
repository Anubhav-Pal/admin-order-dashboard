import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="flex flex-col items-center justify-between gap-1 p-4 rounded-2xl m-2 shadow-lg border">
        <img className="rounded-full w-16 " src={user.picture} alt={user.name} />
        <h2 className="text-md font-bold">{user.name}</h2>
        <p className="text-sm font-semibold">{user.email}</p>
      </div>
    )
  );};

  export default Profile;