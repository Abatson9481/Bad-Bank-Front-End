function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const ctx = useUserContext();
  const currentUser = useCurrentUser();

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleLogin(e) {
    e.preventDefault();
    console.log(email, password);
    if (!validate(email, "Email is required")) return;
    if (!validate(password, "Password is required")) return;

    const user = ctx.state.users.find((user) => user.email === email && user.password === password);

    if (!user) {
      setStatus("Error: Must create an account");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    ctx.setState((state) => ({ ...state, currentUserEmail: email }));
    ctx.addAudit({ action: "Login", email });
       setShow(false);
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
    ctx.setState({ ...ctx.state, currentUser: null });
  }

  return (
    <Card
      bgcolor="info"
      header="Login"
      status={status}
      body={
        show && !currentUser ? (
          <form onSubmit={handleLogin}>
            Username- Email Address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password (required)"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light" disabled={!email && !password}>
              Login
            </button>
          </form>
        ) : (
          <>
            <h5>Success, logged in as {currentUser.email}</h5>
            <button
              type="submit"
              className="btn btn-light"
              onClick={() => {
                clearForm();
                ctx.setState((state) => ({ ...state, currentUserEmail: null }));
              }}
            >
              Logout
            </button>
          </>
        )
      }
    />
  );
}
