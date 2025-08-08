import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/features/authSlice";

const Login = () => {
  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [registerUser, { data: registerData, error: registerError, isLoading: isRegistering, isSuccess: registerSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: isLoggingIn, isSuccess: loginSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    type === "signup"
      ? setSignupInput((prev) => ({ ...prev, [name]: value }))
      : setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    if (Object.values(inputData).some((val) => !val)) {
      toast.error("Please fill in all fields.");
      return;
    }
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerError) toast.error(registerError.data.message || "Signup Failed");
    if (loginError) toast.error(loginError.data.message || "Login Failed");

    if (registerSuccess && registerData) {
      dispatch(userLoggedIn({ user: registerData.user }));
      toast.success(registerData.message || "Signup Successful");
      setSignupInput({ name: "", email: "", password: "" });
      navigate("/");
    }

    if (loginSuccess && loginData) {
      dispatch(userLoggedIn({ user: loginData.user }));
      toast.success(loginData.message || "Login Successful");
      setLoginInput({ email: "", password: "" });
      navigate("/");
    }
  }, [registerError, loginError, registerSuccess, registerData, loginSuccess, loginData, dispatch, navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black transition-all relative">
      
      {/* Background Glows for Dark Mode Only */}
      <div className="absolute w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl -top-24 -left-24 animate-pulse dark:block hidden" />
      <div className="absolute w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl -bottom-24 -right-24 animate-pulse dark:block hidden" />

      <Tabs defaultValue="signup" className="w-full max-w-md z-10">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-white/10 backdrop-blur-md rounded-full p-1 mb-4 shadow-inner">
          <TabsTrigger className="text-gray-800 dark:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-white/30 rounded-full px-4 py-2 transition" value="signup">
            Sign Up
          </TabsTrigger>
          <TabsTrigger className="text-gray-800 dark:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-white/30 rounded-full px-4 py-2 transition" value="login">
            Login
          </TabsTrigger>
        </TabsList>

        {/* Sign Up */}
        <TabsContent value="signup">
          <Card className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white shadow-xl">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-300">Create a new account to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["name", "email", "password"].map((field) => (
                <div key={field} className="space-y-1">
                  <Label htmlFor={field} className="capitalize">{field}</Label>
                  <Input
                    id={field}
                    name={field}
                    type={field === "password" ? "password" : "text"}
                    placeholder={`Enter your ${field}`}
                    value={signupInput[field]}
                    onChange={(e) => handleInputChange(e, "signup")}
                    className="bg-white dark:bg-white/10 border border-gray-300 dark:border-none focus-visible:ring-2 focus-visible:ring-indigo-400 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition"
                disabled={isRegistering}
                onClick={() => handleSubmit("signup")}
              >
                {isRegistering ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Signup"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login */}
        <TabsContent value="login">
          <Card className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white shadow-xl">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-300">Enter your credentials to log in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["email", "password"].map((field) => (
                <div key={field} className="space-y-1">
                  <Label htmlFor={`login-${field}`} className="capitalize">{field}</Label>
                  <Input
                    id={`login-${field}`}
                    name={field}
                    type={field === "password" ? "password" : "text"}
                    placeholder={`Enter your ${field}`}
                    value={loginInput[field]}
                    onChange={(e) => handleInputChange(e, "login")}
                    className="bg-white dark:bg-white/10 border border-gray-300 dark:border-none focus-visible:ring-2 focus-visible:ring-indigo-400 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition"
                disabled={isLoggingIn}
                onClick={() => handleSubmit("login")}
              >
                {isLoggingIn ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
