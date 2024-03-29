import { useState } from "react";
import IMGBGLOGIN from "../assets/images/register_bg_2.png";
import IMGLOGO from "../assets/images/lcc.png";
import ApiUrl from "../utils/ApiUrl";
import { UserApiRouter } from "../utils/user/UserApiRoute";
import Swal from "sweetalert2";

type Props = {};

function LoginPage({}: Props) {
  const [user, setUser] = useState({
    student_id: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await ApiUrl.post(UserApiRouter.login, user);
    console.log(res);
    if (res.data.statusCode == 200) {
      localStorage.setItem("token_student", res.data.response.token);
      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        text: "กำลังเข้าสู่ระบบ",
        confirmButtonColor: "#546e7a",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
    }
  }


  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blue-900 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url(" + IMGBGLOGIN + ")",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className=" flex justify-center items-center text-center">
                      <img src={IMGLOGO} width={300} alt="logo" />
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-400 text-center mb-3 font-bold">
                      <small>Sing IN ( Student )</small>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          รหัสนักศึกษา
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="รหัสนักศึกษา"
                          name="student_id"
                          value={user.student_id}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          รหัสผ่าน
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-600">
                            Remember me
                          </span>
                        </label>
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    {/* <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-200"
                  >
                    <small>Forgot password?</small>
                  </a> */}
                  </div>
                  <div className="w-1/2 text-right">
                    {/* <Link to="/auth/register" className="text-gray-200">
                    <small>Create new account</small>
                  </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default LoginPage;
