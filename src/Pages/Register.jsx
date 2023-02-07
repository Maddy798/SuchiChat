import React, { useState } from "react";
import GoogleButton from "react-google-button";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [profilePic, setprofilePic] = useState(null);

  return (
    <form>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <input type="file" onChange={(e) => setprofilePic(e.target.files[0])} />
      <button type="submit">Register</button>
      <GoogleButton />
    </form>
  );
};

export default Register;
