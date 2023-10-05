import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Input from "../components/Input";
import Button from "../components/Button";
import ENDPOINTS from "../utils/endpoints";
import { postApiCall } from "../utils/apiCalls";
import Toast from "../utils/toastMessage";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/slice/userSlice";
import { RootState } from "../redux/reducers";

function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState({});
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      // setLoading(true);
      const res = await postApiCall("/api/auth/signin", user);
      if (res.success) {
        dispatch(signInSuccess(res));
        Cookies.set("access-token", res.data.token, { expires: 7 });
        Toast("Sign-in successful", "success");
        navigate(ENDPOINTS.HOME);
      } else {
        dispatch(signInFailure(res.message));
        Toast(res.message, "error");
      }
      // setLoading(false);
    } catch (e: any) {
      dispatch(signInFailure(e.message));
      // setLoading(false);
      Toast(e.message, "error");
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input id={"email"} onChange={(e) => handleInputChange(e)} />
        <Input
          id={"password"}
          type={"password"}
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          value="Sign In"
          type="submit"
          className="bg-slate-700"
          disabled={loading}
        />
      </form>
      <div className="my-5">
        <Button
          value={"Sign Up With Google"}
          type={"button"}
          className="bg-red-700"
          disabled={loading}
        />
      </div>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={ENDPOINTS.SIGNUP} className="text-blue-700">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
