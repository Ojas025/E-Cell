import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { logIn } = UserAuth();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await logIn({ email, password });

      if (result.success) {
        navigate('/admin/dashboard');
      }
      else{
        setError("Incorrect email or password");
      }

    } catch (error) {
      console.error(error.message)
      setError("Error while Logging In");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-light to-violet-950 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md text-white rounded-xl shadow-xl p-8 md:p-10">
        <h2 className="text-3xl font-semibold text-center mb-8">Admin Login</h2>

        <form onSubmit={handleLogIn} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md text-black focus:outline-none bg-white/20 focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-white/20 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {

          }

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md font-semibold bg-white text-black hover:bg-gray-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <div className="mt-6 text-center text-red-300 bg-red-900/30 py-2 px-4 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
