import React, { ReactElement, useEffect, useState } from "react";
import { auth } from "../../utils/firbase";

interface Props {
  message: any;
}

export default function ChatMessage({ message }: Props): ReactElement {
  console.log(message);
  const [photoUrl, setPhotoUrl] = useState("");
  var user = auth.currentUser;
  useEffect(() => {
    if (user != null) {
      user?.providerData?.forEach((profile) => {
        console.log(profile?.photoURL);
        if (profile?.photoURL) setPhotoUrl(profile?.photoURL);
      }); //this will give you all the urls once there is user data
    }
  }, [user]);

  const { text, uid, photoURL } = message;

  const messageClass = uid === auth?.currentUser?.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img alt="chat" src={photoUrl} />
      <div>{text}</div>
    </div>
  );
}
