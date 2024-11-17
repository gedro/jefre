import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const SuccessfulLoginHandler = (token, appContext, onAppContextChanged) => {
  const decodedToken = jwtDecode(token);

  const user = {
    username: decodedToken.sub,
    roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
  };

  const newAppContext = {
    csrfToken: null,
    user: user,
    token: token,
    isSignedIn: true,
    isAdmin: user.roles.includes("ROLE_ADMIN"),
    isCandidate: user.roles.includes("ROLE_CANDIDATE"),
    isRecruiter: user.roles.includes("ROLE_RECRUITER")
  };

  onAppContextChanged(newAppContext);

  toast.success("Login Successful");
};