import { useState } from "react";

function TEST() {
  const [status, setStatus] = useState("");

  const handleBroadcast = async () => {
    try {
      setStatus("Envoi en cours...");
      const response = await fetch("/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Message du Phan-Site",
          content: "Contenu de test pour tous les utilisateurs",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("Broadcast terminé avec succès !");
        console.log(data.results); 
      } else {
        setStatus("Erreur : " + data.message);
      }
    } catch (error) {
      setStatus("Erreur réseau : " + error.message);
    }
  };
  

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "grey",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      TEST
      <button onClick={handleBroadcast}>Envoyer à tous les utilisateurs</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default TEST;
