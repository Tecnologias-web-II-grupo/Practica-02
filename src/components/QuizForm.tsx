import { useState } from 'react';
import type { VocabularyItem, UserAnswer } from '../types';

interface QuizFormProps {
  data: VocabularyItem[];
  onFinish: (answers: UserAnswer[]) => void;
}

export default function QuizForm({ data, onFinish }: QuizFormProps) {
  const [inputs, setInputs] = useState<Record<number, string>>({});

  const handleChange = (id: number, value: string) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedAnswers: UserAnswer[] = data.map(item => ({
      itemId: item.id,
      userText: inputs[item.id] || ""
    }));
    onFinish(formattedAnswers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {data.map((item) => (
        <div key={item.id} className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white flex flex-col md:flex-row items-center gap-6">
          <img 
            src={item.image} 
            alt="Pista" 
            className="w-32 h-32 object-cover rounded-md border bg-gray-50" 
          />
          <div className="flex-1 w-full">
            <p className="font-semibold text-lg text-gray-800 mb-3">{item.description}</p>
            <input
              type="text"
              required
              value={inputs[item.id] || ""}
              onChange={(e) => handleChange(item.id, e.target.value)}
              placeholder="Escribe la palabra en inglés..."
              className="w-full border-gray-300 rounded-md p-3 border focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Aplicar Cuestionario
      </button>
    </form>
  );
}