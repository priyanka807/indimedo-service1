import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { ShoppingCartIcon } from "lucide-react";
import { IoIosArrowRoundBack, IoMdArrowRoundBack } from "react-icons/io";

import { useEffect, useState, useMemo, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Modal, Badge } from "@mui/material";

import { BiSolidOffer } from "react-icons/bi";

import { FaUser } from "react-icons/fa";

import { styled } from "@mui/material/styles";

import { useLazyGetCartQuery } from "../../services/apis/product";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/features/cartSlice";
import Signup from "../../screens/Signup/signup.jsx/Signup";
import Login from "../../screens/login/login";
import LoginOtpVerify from "../../screens/login/LoginOtpVerify";
import { usePhoneTextfield } from "../../utils/helperFun/phoneTextfield";
import PhoneTextField from "../Common/PhoneTextField";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example1() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [open1, setOpen1] = useState(false);
  const { count } = useSelector((state) => state.cart);
  const [isSignUp, setIsSignUp] = useState(true);
  const [loginPage, setloginPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalResponsiveOpen, setIsModalResponsiveOpen] = useState(false);
  const [verifyPage, setverifyPage] = useState(false);
  const [signup, setsignup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { error, phoneNumber, setPhoneNumber, handleContinue } =
    usePhoneTextfield(setverifyPage);

  const handleSignUpClick = () => {
    setIsModalOpen(true);

    setIsSignUp(true);
  };
  const handleResponsiveLogin = () => {
    setIsModalResponsiveOpen(true);
    setOpen1(false);
  };
  const handleLoginClick = () => {
    setIsModalOpen(true);
    setIsSignUp(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setverifyPage(false);
  };

  const [getcartData, { data, isLoading, isError }] = useLazyGetCartQuery();

  useEffect(() => {
    getcartData().then((data) =>
      dispatch(addProductToCart(data?.data?.products))
    );
  }, []);

  useEffect(() => {
    getcartData().then((data) =>
      dispatch(addProductToCart(data?.data?.products))
    );
  }, []);

  const memorizeLoginPage = useMemo(() => {
    setloginPage(true);
  }, [verifyPage, loginPage]);

  const handleClose1 = () => {
    setIsModalResponsiveOpen(false), setverifyPage(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };

  const style1 = {
    position: "fixed",

    left: "50%",
    bottom: "0px",
    transform: "translateX(-50%)",
    width: "100%",
    height: "300px",
    background: "white",
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <div className="bg-white">
      <Transition.Root show={open1} as={Fragment} className="">
        <Dialog
          as="div"
          className="relative z-40   lg:hidden"
          onClose={setOpen1}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-[70%] max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className=" flex  justify-between  p-3 align-middle ">
                  <div onClick={handleResponsiveLogin}>
                    <FaUser
                      className=""
                      style={{
                        borderRadius: "50%",
                        padding: "2px",
                        border: "1px solid black",
                      }}
                    />{" "}
                    Hello , SignIn/SignUp
                  </div>

                  <div onClick={() => setOpen1(false)}>
                    {" "}
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>

                <Tab.Group as="div" className="mt-2"></Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      Cart
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <Modal
        open={isModalResponsiveOpen}
        onClose={handleClose1}
        className="md:hidden"
      >
        <Box sx={style1}>
          {/* {loginPage&&!verifyPage(<> </>)}  */}
          {loginPage && !verifyPage && (
            <>
              {" "}
              <div className="border-4  border-b-indigo-500  p-3  ">
                Sign to your account
              </div>
              <PhoneTextField
                handleContinue={handleContinue}
                verifyPage={verifyPage}
                setverifyPage={setverifyPage}
                error={error}
                setPhoneNumber={setPhoneNumber}
                phoneNumber={phoneNumber}
                inPhone={true}
                hidden="hidden"
                sx={{
                  "& > :not(style)": { m: 0.75, width: "33ch" },
                }}
              />
              <p className="pl-4">
                {" "}
                By signing up, I agree to the Privacy Policy,Terms and
                Conditions of Indimedo Website.
              </p>
            </>
          )}

          <LoginOtpVerify verifyPage={verifyPage} />
        </Box>
      </Modal>

      <header className="relative bg-white ">
        <nav aria-label="Top" className="">
          <div className="border-b border-gray-200    sm:px-10 sm:py-3 p-4">
            <div className="flex h-16 items-center">
              {location.pathname === "/" ? (
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 md:hidden  "
                  onClick={() => setOpen1(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className=" h-6 w-6" aria-hidden="true" />
                </button>
              ) : (
                <div className="md:hidden">
                  <IoMdArrowRoundBack onClick={() => navigate(-1)} />
                </div>
              )}

              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <img
                    className=""
                    src="https://indimedo.com/assets/img/logo.png"
                    alt=""
                    style={{ width: "80px", height: "70px" }}
                  />
                </Link>
              </div>

              <div className=" ml-auto items-center   hidden md:flex ">
                {/* <div  className="  ">    </div>  */}
{/*                 <div className="lg:ml-8 lg:flex  ">
                  <Link
                    to="/offers"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <BiSolidOffer />

                    <span className="ml-1 block text-sm font-medium">
                      Offers
                    </span>
                    <span className="sr-only">, change currency</span>
                  </Link>
                </div> */}

                <div className="lg:ml-8 lg:flex  ">
                  <Link
                    to="/cart"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <StyledBadge badgeContent={count} color="secondary">
                      <ShoppingCartIcon className="md:ml-4  lg:ml-0" />
                    </StyledBadge>

                    <span className="ml-3 block text-sm font-medium">Cart</span>
                    <span className="sr-only">, change currency</span>
                  </Link>
                </div>
                <div className="  ">
                  <Link
                    to=""
                    className="flex items-center text-gray-700 hover:text-gray-800   "
                  >
                    <FaUser className="ml-4" />
                    <span
                      className="ml-1 block text-sm font-medium"
                      onClick={handleSignUpClick}
                    >
                      Signup/
                    </span>
                    <span
                      className="ml-1 block text-sm font-medium"
                      onClick={handleLoginClick}
                    >
                      Signin
                    </span>
                  </Link>
                </div>
                <Modal
                  open={isModalOpen}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={style}
                    className="sm:w-[70%]  md:w-[80% !important]  lg:w-[60%]"
                  >
                    <div
                      className="  flex justify-around items-center  md:px-0  md:py-0  lg:px-2 lg:py-2 "
                      // style={{ padding: "10px 40px" }}
                    >
                      <div>
                        <div>
                          <img
                            src="https://www.netmeds.com/images/cms/wysiwyg/cms/1680000865_New_Dest_deal.png"
                            alt="sign-in banner"
                            width="180px"
                            height="200"
                          />
                        </div>

                        <div>
                          <h1>Welcome to Indimedo website</h1>
                          <p className="w-[85%]">
                            Sign up with us get exclusive offers,discounts and
                            savings on medicine ,get express delivery on same
                            day
                          </p>
                        </div>
                      </div>

                      <div>
                        {isSignUp ? (
                          <>
                            <Signup
                              setloginPage={setloginPage}
                              loginPage={loginPage}
                              verifyPage={verifyPage}
                              setverifyPage={setverifyPage}
                              setsignup={setsignup}
                              redirectloginPage={handleLoginClick}
                            />{" "}
                            <LoginOtpVerify verifyPage={verifyPage} />
                          </>
                        ) : (
                          <>
                            <Login
                              loginPage={loginPage}
                              setloginPage={setloginPage}
                              verifyPage={verifyPage}
                              setverifyPage={setverifyPage}
                              setsignup={setsignup}
                              redirectSignupPage={handleSignUpClick}
                            />
                            <LoginOtpVerify verifyPage={verifyPage} />
                          </>
                        )}
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>

              <div className="ml-32  flow-root md:hidden  lg:ml-6">
                <Link to="/cart">
                  <StyledBadge badgeContent={count} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>

                  {/* <span className="block sm:hidden  ml-3  text-sm font-medium">Cartcart</span> */}
                  <span className="sr-only">, change currency</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
