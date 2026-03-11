import React, { useEffect, useState } from "react";
import "./App.css";

function KudosForm({ users, onNewKudo }) {
  const [toId, setToId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!toId || !message) return;
    const fromId = 1; // hardcoded current user for demo
    const res = await fetch("/api/kudos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromId, toId: parseInt(toId), message }),
    });
    if (res.ok) {
      const data = await res.json();
      onNewKudo(data);
      setToId("");
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="kudos-form">
      <h2>Give Kudos</h2>
      <select value={toId} onChange={(e) => setToId(e.target.value)}>
        <option value="">Select a user</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Write a short message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function KudosFeed({ feed }) {
  return (
    <div className="kudos-feed">
      <h2>Recent Kudos</h2>
      {feed.length === 0 && <p>No kudos yet.</p>}
      {feed.map((k) => (
        <div key={k.id} className="kudo-item">
          <strong>{k.from.name}</strong> → <strong>{k.to.name}</strong>
          <p>{k.message}</p>
          <small>{new Date(k.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers);
    fetch("/api/kudos")
      .then((r) => r.json())
      .then(setFeed);
  }, []);

  const handleNew = (kudo) => {
    setFeed([kudo, ...feed]);
  };

  return (
    <div className="App">
      <KudosForm users={users} onNewKudo={handleNew} />
      <KudosFeed feed={feed} />
    </div>
  );
}

export default App;
