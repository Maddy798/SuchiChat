import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { v4 } from "uuid";
import { db, auth, storage, provider } from "../firebase";
import { useNavigate } from "react-router";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [profilePic, setprofilePic] = useState(null);
  const userCollectionRef = collection(db, "users");
  let navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const ImageRef = ref(storage, `profilePic/${profilePic.name + v4()}`);
      uploadBytes(ImageRef, profilePic).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updateProfile(result.user, {
            displayName: name,
            photoURL: url,
          });
          addDoc(userCollectionRef, {
            username: name,
            email,
            photourl: url,
            uid: result.user.uid,
          });
          navigate("/");
        });
      });
    });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      addDoc(userCollectionRef, {
        username: result.user.displayName,
        email: result.user.email,
        photourl: result.user.photoURL,
        uid: result.user.uid,
      });
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setname(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        required
      />
      <input
        type="file"
        accept="images/*"
        onChange={(e) => setprofilePic(e.target.files[0])}
      />
      <button type="submit">Register</button>
      <GoogleButton onClick={handleGoogleSignIn} />
    </form>
  );
};

export default Register;
