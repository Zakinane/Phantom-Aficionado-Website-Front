import Chat from "./Chat";
import "./Chats.css";

function Chats() {
  return (
    <div className="messages">
      <Chat
        chatRoom=""
        title="Talk"
        content="C'est dure de rendre stylééeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        isNew={true}
        nbrPosts={33}
      />
      <Chat
        chatRoom="Test"
        title="Phan"
        content="Un autre message"
        isNew={false}
        nbrPosts={12}
      />
      </div>
  );
}

export default Chats;
