import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import QuestionList from './QuestionList';
import NewQuestionForm from './NewQuestionForm';
import './App.css'; // Import the CSS file

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((question) => question.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    setQuestions(updatedQuestions);
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/add">Add Question</Link>
          <Link to="/view">View Questions</Link>
        </nav>
        <div className="container">
          <Routes>
            <Route
              path="/add"
              element={
                <div className="section add-question-section">
                  <h1>Add New Question</h1>
                  <NewQuestionForm onAddQuestion={handleAddQuestion} />
                </div>
              }
            />
            <Route
              path="/view"
              element={
                <div className="section view-questions-section">
                  <h1>View Questions</h1>
                  <QuestionList
                    questions={questions}
                    onDeleteQuestion={handleDeleteQuestion}
                    onUpdateQuestion={handleUpdateQuestion}
                  />
                </div>
              }
            />
            <Route
              path="/"
              element={
                <div>
                  <h1>Welcome to the Quiz App</h1>
                  <p>Select a section above to get started.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
