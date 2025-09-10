import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUser() {
      try {
        const result = await fetch("http://localhost:8080/api/auth/me", {
          credentials: "include",
        });
        const data = await result.json();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  async function handleLogout() {
    try {
      const result = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!result.ok) {
        console.error(`Failed to log out: ${result.error}`);
      }
      console.log("Logging out");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="text-white p-5 lg:p-15 flex flex-col gap-5">
      <h2>User: {user.email}</h2>
      <h1 className="text-4xl">Recipes</h1>
      {/* <nav>
          <div>Items</div>
        </nav> */}
      <div>
        <h2 className="font-bold">Tags</h2>
        <div className="flex gap-2">
          <button className="cursor-pointer flex gap-2 rounded-lg px-2 py-1 bg-gray-500">
            <div>Baking</div>
            <div className="bg-gray-400 rounded-full h-6 w-6 flex items-center justify-center">
              4
            </div>
          </button>
          <button className="cursor-pointer flex gap-2 rounded-lg px-2 py-1 bg-gray-500">
            <div>Cooking</div>
            <div className="bg-gray-400 rounded-full h-6 w-6 flex items-center justify-center">
              2
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div>Items(54)</div>
          <Link
            to="/add"
            className="cursor-pointer rounded-lg border-white border-1 px-2 py-1"
          >
            + Add
          </Link>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-md bg-blue-500 text-white p-2"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
