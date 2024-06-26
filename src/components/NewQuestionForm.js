import React, { useState } from 'react';

function NewQuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name.startsWith('answer')) {
      const index = parseInt(name.replace('answer', ''), 10);
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData({ ...formData, answers: newAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newQuestion) => onAddQuestion(newQuestion));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Question</h3>
      <label>
        Prompt:
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>
      {formData.answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            name={`answer${index}`}
            value={answer}
            onChange={handleChange}
          />
        </label>
      ))}
      <label>
        Correct Index:
        <input
          type="number"
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;
