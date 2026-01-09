import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("username", username);

    if (password.trim()) {
      formData.append("password", password);
    }

    if (avatar) {
      formData.append("avatar", avatar);
    }

    const res = await fetch(`${API}/api/user/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Update failed");
      return;
    }

    
    if (data.passwordChanged) {
      alert("Password changed. Please login again.");
      localStorage.clear();
      navigate("/auth");
      return;
    }

     
    localStorage.setItem("user", JSON.stringify(data.user));

    setMessage("Profile updated successfully");
    setIsEdit(false);
    setPassword("");
    setAvatar(null);
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>

          {message && (
            <div className="mb-4 text-green-600 font-medium">
              {message}
            </div>
          )}

          {/* ================= AVATAR ================= */}
          <div className="mb-8">
            <label className="block font-medium mb-3">Avatar</label>

            <div className="flex items-center gap-6">
              {/* Avatar preview */}
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : `http://localhost:5000/images/${user.avatar}`
                }
                onError={(e) =>
                  (e.currentTarget as HTMLImageElement).src =
                    "http://localhost:5000/images/default-user.png"
                }
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border shadow"
              />

              {isEdit && (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setAvatar(e.target.files?.[0] || null)
                    }
                  />
                  <div className="px-5 py-3 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                    Choose image
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* ================= USERNAME ================= */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Username</label>
            <input
              value={username}
              disabled={!isEdit}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg ${
                !isEdit && "bg-gray-100"
              }`}
            />
          </div>

          {/* ================= EMAIL ================= */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              value={user.email || ""}
              disabled
              className="w-full px-4 py-3 border rounded-lg bg-gray-100"
            />
          </div>

          {/* ================= PASSWORD ================= */}
          {isEdit && (
            <div className="mb-6">
              <label className="block font-medium mb-1">
                New Password (optional)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>
          )}

          {/* ================= ACTION BUTTONS ================= */}
          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleSave}
                className="bg-black text-white px-6 py-3 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEdit(false);
                  setAvatar(null);
                  setPassword("");
                  setUsername(user.username);
                }}
                className="px-6 py-3 border rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
