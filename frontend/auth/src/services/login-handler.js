import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const SuccessfulLoginHandler = (token, appContext, onAppContextChanged, history) => {
  const decodedToken = jwtDecode(token);

  const user = {
    id: decodedToken.sub,
    name: decodedToken.name,
    username: decodedToken.username,
    email: decodedToken.email,
    isMfaEnabled: decodedToken.isMfaEnabled,
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

  let targetPath = '/profile';
  if(newAppContext.isAdmin) {
    targetPath = '/admin';
  } else if(newAppContext.isCandidate) {
    targetPath = '/candidate';
  } else if(newAppContext.isRecruiter) {
    targetPath = '/recruiter';
  }
  history.push(targetPath);
};