import React, { ReactElement, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, auth } from "../../utils/firbase";
import ChatMessage from "./ChatMessage";
import firebase from "../../utils/firbase";

export default function ChatComponent(): ReactElement {
  const messagesRef = db.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormValue("");
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <>
      {/* <div>Hi there</div> */}
      {auth.currentUser && (
        <button onClick={() => auth.signOut()}> Sign Out</button>
      )}
      <section>
        {user ? (
          <>
            {" "}
            <div>
              {messages &&
                messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
            </div>
            <form onSubmit={sendMessage}>
              <input
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
              />
              <button type="submit">SUBMIT</button>
            </form>
          </>
        ) : (
          <>
            <button onClick={signInWithGoogle}> Sign in with Google</button>
          </>
        )}
      </section>
    </>
  );
}
