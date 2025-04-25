import { useAuth } from '../../../context/auth.context';

export default function LoginPage() {
  const auth = useAuth();

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => auth.signIn(null)}>Login</button>
    </div>
  );
}
