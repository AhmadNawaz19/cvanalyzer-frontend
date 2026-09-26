import { FaGoogle, FaGithub } from 'react-icons/fa';
import './styles/sociallogin.css';

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8000/githubauth/github";
  };

  return (
    <div id="socialLogin">
      <button type="button" className="social-btn google-btn" onClick={handleGoogleLogin}>
        <FaGoogle className="social-icon google-icon" />
        <span>Google</span>
      </button>

      <button type="button" className="social-btn github-btn" onClick={handleGithubLogin}>
        <FaGithub className="social-icon github-icon" />
        <span>Github</span>
      </button>
    </div>
  );
};

export default SocialLogin;