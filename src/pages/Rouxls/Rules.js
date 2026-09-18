import { useNavigate } from "react-router-dom";
import "./Rules.css";

function Rules() {
  const navigate = useNavigate();

  const rules = [
    {
      number: "01",
      title: "RESPECT EVERYONE",
      description:
        "Treat other members with respect. No harassment, insults, discrimination, or personal attacks.",
    },
    {
      number: "02",
      title: "NO SPAM",
      description:
        "Don't flood the Phorum with repeated messages, useless posts, or excessive self-promotion.",
    },
    {
      number: "03",
      title: "STAY ON TOPIC",
      description:
        "Keep your discussions related to the topic. Create a new topic when the discussion belongs somewhere else.",
    },
    {
      number: "04",
      title: "NO SPOILERS",
      description:
        "Use appropriate spoiler warnings when discussing important story elements, endings, or major events.",
    },
    {
      number: "05",
      title: "KEEP IT SAFE",
      description:
        "Do not share harmful, illegal, threatening, or inappropriate content.",
    },
    {
      number: "06",
      title: "USE COMMON SENSE",
      description:
        "Think before posting. If something clearly shouldn't be posted, don't post it.",
    },
  ];

  return (
    <div className="quick-rules">
      <section className="rules-banner">
        <div className="rules-banner-small">PHORUM COMMUNITY</div>
        <h1>QUICK RULES</h1>
        <p>READ THIS BEFORE POSTING</p>
      </section>

      <section className="rules-content">
        <div className="rules-intro">
          <span className="rules-symbol">!</span>

          <div>
            <h2>KEEP THE PHORUM CLEAN</h2>
            <p>
              These are the basic rules everyone should follow when using the
              Phorum. They're here to keep the community fun and welcoming.
            </p>
          </div>
        </div>

        <div className="rules-grid">
          {rules.map((rule) => (
            <article className="rule-card" key={rule.number}>
              <div className="rule-number">{rule.number}</div>

              <div className="rule-info">
                <h3>{rule.title}</h3>
                <p>{rule.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="rules-warning">
          <span>⚠</span>
          <p>
            Breaking these rules may result in your content being removed or
            your account being restricted.
          </p>
        </div>

        <button
          className="rules-back-button"
          onClick={() => navigate("/phorum")}
        >
          ← BACK TO PHORUM
        </button>
      </section>

      <footer className="rules-footer">
        <span>PHORUM</span>
        <span>•</span>
        <span>Persona 5 Phansite</span>
        <span>•</span>
        <span>Made by Zak</span>
      </footer>
    </div>
  );
}

export default Rules;