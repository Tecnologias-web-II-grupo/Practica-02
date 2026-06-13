import { useState } from 'react';
import { vocabularyData } from './data/vocabulary';
// Agregamos "type" aquí
import type { UserAnswer } from './types';
import QuizForm from './components/QuizForm';
import ResultsTable from './components/ResultsTable';

function App() {
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleFinish = (userAnswers: UserAnswer[]) => {
    setAnswers(userAnswers);
    setIsFinished(true); // El juego termina aquí
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
            Práctica de Vocabulario 🇬🇧
          </h1>
          <p className="text-gray-600 font-medium">Adivina las {vocabularyData.length} palabras en inglés.</p>
        </header>

        {/* Renderizado Condicional: Formulario vs Resultados */}
        {!isFinished ? (
          <QuizForm data={vocabularyData} onFinish={handleFinish} />
        ) : (
          <ResultsTable data={vocabularyData} answers={answers} />
        )}
      </div>
    </div>
  );
}

export default App;