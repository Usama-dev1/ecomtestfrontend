import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import { useEffect, useState } from "react";
import { setCredentials } from "../slices/authSlice";
const Profilepage = () => {
  const dispatch=useDispatch()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isError, isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setEmail(userInfo.email);
    setUsername(userInfo.name);
  }, [userInfo.email, userInfo.name]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setSuccessMessage(""); // Clear success message when editing starts
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset fields and clear messages on cancel
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        const res=await updateProfile({
          _id: userInfo._id,
          name: username,
          email,
          password: newPassword,
        }).unwrap();
        console.log(res)
        dispatch(setCredentials({...res}))
        setSuccessMessage("Profile updated successfully");
        setError("");
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update profile", error);
        setError("Failed to update profile. Please try again.");
      }
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 my-5 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded-md">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        {isEditing && (
          <>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        <div className="flex space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={handleEditClick}
              className="w-full py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
              <button
                type="button"
                onClick={handleCancelClick}
                className="w-full py-2 px-4 bg-white border-2 text-black font-semibold rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profilepage;
