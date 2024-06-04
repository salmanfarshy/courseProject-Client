import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserOrAdmin } from "../apis/serverApis.js";
import UnsuccessToast from "../components/toast/UunsuccessToast.jsx";
import LoadingPage from "../components/LoadingPage.jsx";
import Header from "../components/root_page/Header.jsx";

function Registration() {
  const [isRender, setIsRender] = useState(false);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState("unknown");

  // useEffect(() => {
  //   if (res?.success && isSubmit) setShowSuccToast(true);
  //   else if (!res?.success && isSubmit) setShowUnsuccToast(true);
  // }, [res?.success]);
  const register = async (e) => {
    e.preventDefault();
    setIsRender(true);
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData);
    // console.log(credentials);
    const res = await createUserOrAdmin(credentials);
    // console.log(res.data);
    if (res?.data?.success === "success") {
      localStorage.setItem("User", JSON.stringify(res?.data?.newUser));
      localStorage.setItem("token", res?.data?.token);
      e.target.reset();
      navigate("/user/dashboard");
    }
    // console.log(res?.data?.newUser);
    setIsRender(false);
    setShowToast(res?.data?.success);
  };

  return (
    <>
      {/* success and unsuccess toast */}
      <section className="bg-gray-100 h-screen relative">
        {isRender && <LoadingPage />}

        {showToast === "unsuccess" && (
          <UnsuccessToast
            setShowToast={setShowToast}
            message="Something wrong."
          />
        )}
        {/* Header */}
        <Header />

        {/* <UserCreateSucc /> */}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:mt-5 lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign up to your account
              </h1>
              <form onSubmit={register} className="space-y-4 md:space-y-6">
                {/*name input*/}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="username"
                  />
                </div>

                {/*email input*/}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                </div>

                {/*password input*/}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </div>

                {/*Register button*/}
                <button
                  type="submit"
                  className="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Register
                </button>
              </form>

              {/*redirect to login*/}
              <p className="text-sm font-light text-gray-500">
                If you have already an account then?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full fixed bottom-0 md:py-1.5 py-1 text-center md:text-base text-sm font-medium text-slate-700 bg-gray-300">
          &copy; 2024 Salman Farshy
        </div>
      </section>
      {/* )} */}
    </>
  );
}

export default Registration;
