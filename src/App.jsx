import React, { useState } from 'react';
import './App.css';

const QuestionComponent = () => {
  // Customize your questions and options here
  const questions = [
    'Hvor mange medaljer vinder Danmark?',
    'Bedst placeret i herrenes landevejsløb',
    'Hvilket land vinder flest guldmedaljer?',
    'Bedst placeret land i håndbold',
    'Bedst placeret i kvindernes 100m sprint',
    'Hvor mange medaljer vinder Danmark i svømning',
    'Bedst placeret i kvindernes landevejsløb',
    'Which countries have you visited?',
    'What is your favorite movie genre?',
    'What sports do you play?',
    'What is your favorite book?',
    'Which musical instruments do you play?',
    'What is your preferred time of day?',
  ];

  const options = [
    ['Under 10', '10 - 15', 'Over 15'],
    ['Van Aert', 'Mads P', 'Pogacar'],
    ['USA', 'Kina', 'Frankrig'],
    ['Frankring', 'Spanien', 'Danmark'],
    ["Sha'Carri Richardson", 'Julien Alfred', 'Shericka Jackson'],
    ['0', '1-3', '+3'],
    ['Demi Vollering', 'Marianne Vos', 'Lotte Kopecky'],
    ['USA', 'France', 'Japan'],
    ['Action', 'Comedy', 'Drama'],
    ['Football', 'Basketball', 'Tennis'],
    ['Fiction', 'Non-Fiction', 'Biography'],
    ['Guitar', 'Piano', 'Violin'],
    ['Morning', 'Afternoon', 'Night'],
  ];

  const [selectedOptions, setSelectedOptions] = useState(Array(13).fill([]));
  const [doubleSelectedCount, setDoubleSelectedCount] = useState(0);
  const [score, setScore] = useState(100);

  const handleSelection = (questionIndex, option) => {
    const currentSelection = selectedOptions[questionIndex];
    const newSelection = currentSelection.includes(option)
      ? currentSelection.filter((opt) => opt !== option)
      : [...currentSelection, option];

    if (newSelection.length > 2) return;

    const updatedSelections = selectedOptions.map((sel, index) =>
      index === questionIndex ? newSelection : sel
    );

    const newDoubleSelectedCount = updatedSelections.filter(
      (sel) => sel.length === 2
    ).length;

    if (newDoubleSelectedCount > doubleSelectedCount) {
      setScore(score + 20);
    } else if (newDoubleSelectedCount < doubleSelectedCount) {
      setScore(score - 20);
    }

    setSelectedOptions(updatedSelections);
    setDoubleSelectedCount(newDoubleSelectedCount);
  };

  return (
    <div className="app-container">
      <div className="container">
        <div className="sticky-header">
          <h2>
            Questions left where you can select two options:{' '}
            {5 - doubleSelectedCount}
          </h2>
          <h2>Pris: {score}</h2>
          <h3>Mobilepay Box: xxxxx</h3>
        </div>
        <input type="text" placeholder="Navn" name="text" class="input-navn"></input>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="question">
            <h3>{question}</h3>
            {options[qIndex].map((option) => (
              <label key={option} className="option-container">
                {option}
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions[qIndex].includes(option)}
                  disabled={
                    selectedOptions[qIndex].length === 2
                      ? !selectedOptions[qIndex].includes(option)
                      : doubleSelectedCount >= 5 &&
                        selectedOptions[qIndex].length === 1 &&
                        !selectedOptions[qIndex].includes(option)
                  }
                  onChange={() => handleSelection(qIndex, option)}
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </div>
        ))}
        <button>Indsend</button>
      </div>
    </div>
  );
};

export default QuestionComponent;
