import { useContext, useState } from "react";
import logo from "../../assets/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlistData } = useContext(WishlistContext);

  const { userToken, setUserToken } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <header className="bg-gray-200 fixed inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between px-6 py-3 lg:px-8"
          aria-label="Global"
        >
          <Link to={""} className="lg:pe-4">
            <span className="sr-only">Your Company</span>
            <img className="" src={logo} width={120} alt />
          </Link>
          <div onClick={() => setIsOpen(true)} className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-transparent hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-2 capitalize">
            {userToken && (
              <>
                <NavLink to={"/"} className=" font-medium text-gray-900">
                  home
                </NavLink>

                <NavLink to={"brands"} className=" font-medium text-gray-900">
                  brands
                </NavLink>
                <NavLink
                  to={"categories"}
                  className=" font-medium text-gray-900"
                >
                  categories
                </NavLink>
                <NavLink to={"products"} className=" font-medium text-gray-900">
                  products
                </NavLink>
              </>
            )}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-5">
            {userToken ? (
              <>
                <div>
                  <NavLink
                    to={"wishlist"}
                    className="relative font-medium text-gray-900 mr-4"
                  >
                    <i className="fa-solid fa-heart fa-xl" />
                    <span className="absolute -top-2 font-medium left-2/2 text-white text-main px-0.5">
                      {wishlistData?.count}
                    </span>
                  </NavLink>
                  <NavLink
                    to={"cart"}
                    className="relative font-medium text-gray-900 m-0"
                  >
                    <i className="fas fa-shopping-cart fa-xl "></i>
                    <span className="absolute -top-2 font-medium left-2/2  text-main px-0.5">
                      {cart?.numOfCartItems}
                    </span>
                  </NavLink>
                </div>
                <span
                  className=" font-medium  cursor-pointer  px-2 py-0.5 rounded-md text-red-500"
                  onClick={() => logOut()}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <NavLink to={"register"} className=" font-medium text-gray-900">
                  Register
                </NavLink>
                <NavLink to={"login"} className=" font-medium text-gray-900">
                  Login <span aria-hidden="true">→</span>
                </NavLink>
              </>
            )}
          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu open state. */}
        <div
          className={isOpen ? "lg:hidden" : "hidden"}
          role="dialog"
          aria-modal="true"
        >
          {/* Background backdrop, show/hide based on slide-over state. */}
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to={"/"} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="" src={logo} width={120} alt />
              </NavLink>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="-m-2.5  bg-transparent hover:bg-gray-100 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <NavLink
                    to={"/"}
                    className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                  >
                    home
                  </NavLink>
                  <NavLink
                    to={"cart"}
                    className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                  >
                    cart
                  </NavLink>
                  <NavLink
                    to={"brands"}
                    className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                  >
                    brands
                  </NavLink>
                  <NavLink
                    to={"categories"}
                    className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                  >
                    categories
                  </NavLink>
                  <NavLink
                    to={"products"}
                    className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                  >
                    products
                  </NavLink>
                </div>
                <div className="py-6">
                  <NavLink
                    to={"register"}
                    className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to={"login"}
                    className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Log in <span aria-hidden="true">→</span>
                  </NavLink>
                  <span className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                    Log Out
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
