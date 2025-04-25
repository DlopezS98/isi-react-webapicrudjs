import { useAuth } from '../../../context/auth.context';

export default function LoginPage() {
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get('username');
    const password = form.get('password');

    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    await auth.signIn({ username, password });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <p>Login to access the application</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
