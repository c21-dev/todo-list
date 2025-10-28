import React, { useState } from "react";

export default function TodoListForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // require a title

    const todo = {
      title: title.trim(),
      description: description.trim(),
      tag: tag.trim(),
      createdAt: new Date().toISOString(),
    };

    if (typeof onSubmit === "function") onSubmit(todo);

    // reset form
    setTitle("");
    setDescription("");
    setTag("");
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Todo form">
      <div>
        <label htmlFor="todo-title">Title</label>
        <input
          id="todo-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="todo-description">Description</label>
        <textarea
          id="todo-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="todo-tag">Tag</label>
        <input
          id="todo-tag"
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      <button type="submit">Add Todo</button>
    </form>
  );
}
