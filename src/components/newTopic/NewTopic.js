import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./NewTopic.css";

const NewTopic = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [showPoll, setShowPoll] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddTag = (e) => {
    if (e.key === "Enter" && e.target.value) {
      e.preventDefault();
      setTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const applyMarkdown = (syntax) => {
    const textarea = document.querySelector("textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      let insertText = syntax;
      if (syntax === "Spoiler") insertText = "||||";
      if (syntax === "Link") insertText = "[](url)";
      if (syntax === "Blockquote") insertText = "> ";
      if (syntax === "List") insertText = "- ";

      const newText =
        description.slice(0, start) + insertText + description.slice(end);
      setDescription(newText);

      setTimeout(() => {
        if (syntax === "spoiler")
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        else if (syntax === "link")
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        else
          textarea.selectionStart = textarea.selectionEnd =
            start + insertText.length;
        textarea.focus();
      }, 0);

      return;
    }

    // Texte sélectionné
    const selectedText = description.slice(start, end);
    let transformed = selectedText;

    switch (syntax) {
      case "Bold":
        transformed = `**${selectedText}**`;
        break;
      case "Italic":
        transformed = `*${selectedText}*`;
        break;
      case "`":
        transformed = `\`${selectedText}\``;
        break;
      case "Crossed":
        transformed = `~~${selectedText}~~`;
        break;
      case "Spoiler":
        transformed = `||${selectedText}||`;
        break;
      case "Link":
        transformed = `[${selectedText}](url)`;
        break;
      case "Blockquote":
        transformed = `> ${selectedText}`;
        break;
      case "List":
        transformed = `- ${selectedText}`;
        break;
      default:
        transformed = selectedText;
    }

    const newText =
      description.slice(0, start) + transformed + description.slice(end);
    setDescription(newText);

    setTimeout(() => {
      textarea.selectionStart = start;
      textarea.selectionEnd = start + transformed.length;
      textarea.focus();
    }, 0);
  };

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => setPollOptions([...pollOptions, ""]);

  const removePollOption = (index) => {
    setPollOptions(pollOptions.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!title) return alert("Title is required");

    const body = {
      title,
      description,
      tags,
      poll: showPoll
        ? {
            question: pollQuestion,
            options: pollOptions.filter((o) => o.trim() !== ""),
          }
        : undefined,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URI}/topics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create topic");
      }
      const data = await res.json();
      console.log("Topic created:", data);
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">New Topic</h2>

        <input
          type="text"
          className="input-title"
          placeholder="Input the Subject Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="input-tags"
          placeholder="Add tags (press Enter)"
          onKeyDown={handleAddTag}
        />
        <div className="tags-list">
          {tags.map((t, i) => (
            <span key={i} className="tag" onClick={() => handleRemoveTag(i)}>
              {t} ✕
            </span>
          ))}
        </div>

        <button className="poll-btn" onClick={() => setShowPoll(!showPoll)}>
          {showPoll ? "REMOVE MINI-POLL" : "ADD A MINI-POLL"}
        </button>

        {showPoll && (
          <div className="poll-editor">
            <input
              type="text"
              placeholder="Poll Question"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
            />
            {pollOptions.map((opt, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "5px", marginBottom: "5px" }}
              >
                <input
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handlePollOptionChange(i, e.target.value)}
                  style={{ flex: 1 }}
                />
                {i >= 2 && (
                  <button type="button" onClick={() => removePollOption(i)}>
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addPollOption}>
              Add Option
            </button>
          </div>
        )}

        <div className="editor">
          <div className="toolbar">
            <button type="button" onClick={() => applyMarkdown("Bold")}>
              B
            </button>
            <button type="button" onClick={() => applyMarkdown("Italic")}>
              I
            </button>
            <button>U</button>
            <button type="button" onClick={() => applyMarkdown("Crossed")}>
              S
            </button>
            <button
              type="button"
              onClick={() => applyMarkdown("`")}
            >{`</>`}</button>
            <button type="button" onClick={() => applyMarkdown("List")}>
              ≡
            </button>
            <button type="button" onClick={() => applyMarkdown("Blockquote")}>
              “ ”
            </button>
            <button type="button" onClick={() => applyMarkdown("Spoiler")}>
              SPOILER
            </button>
            <button>😊</button>
            <button type="button" onClick={() => applyMarkdown("Link")}>
              🔗
            </button>
            <button>🖼️</button>
            <button
              className="preview"
              type="button"
              onClick={() => setShowPreview(!showPreview)}
            >
              PREVIEW
            </button>{" "}
          </div>
          <textarea
            placeholder="To keep discussions pleasant, we thank you for remaining polite in all circumstances :)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {showPreview && (
            <div className="preview-box">
              <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
            </div>
          )}
        </div>

        <button className="post-btn" onClick={handlePost}>
          POST
        </button>
      </div>
    </div>
  );
};

export default NewTopic;
