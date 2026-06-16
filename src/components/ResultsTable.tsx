import type { VocabularyItem, UserAnswer } from '../types';

interface ResultsTableProps {
  data: VocabularyItem[];
  answers: UserAnswer[];
}

export default function ResultsTable({ data, answers }: ResultsTableProps) {
  
  const totalPoints = data.reduce((acumulador, item) => {
    const userAnswer = answers.find(a => a.itemId === item.id)?.userText || "";
    const isCorrect = userAnswer.toLowerCase().trim() === item.correctAnswer.toLowerCase().trim();
    return acumulador + (isCorrect ? 5 : 0);
  }, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Hoja de Resultados</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border border-gray-700">#</th>
              <th className="p-3 border border-gray-700">Imagen</th>
              <th className="p-3 border border-gray-700 text-left">Descripción</th>
              <th className="p-3 border border-gray-700">Respuesta Usuario</th>
              <th className="p-3 border border-gray-700">Respuesta Correcta</th>
              <th className="p-3 border border-gray-700">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const userAnswer = answers.find(a => a.itemId === item.id)?.userText || "";
              const isCorrect = userAnswer.toLowerCase().trim() === item.correctAnswer.toLowerCase().trim();
              const points = isCorrect ? 5 : 0;

              return (
                <tr key={item.id} className={isCorrect ? "bg-[#dcfce7]" : "bg-[#fecdd3]"}>
                  <td className="border border-gray-300 p-3 text-center font-medium">{index + 1}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    <img src={item.image} alt="imagen" className="w-16 h-16 object-cover mx-auto rounded shadow-sm" />
                  </td>
                  <td className="border border-gray-300 p-3">{item.description}</td>
                  <td className="border border-gray-300 p-3 text-center italic">{userAnswer}</td>
                  <td className="border border-gray-300 p-3 text-center font-bold">{item.correctAnswer}</td>
                  <td className="border border-gray-300 p-3 text-center font-bold text-lg">{points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg border border-gray-200 mt-6">
        <button 
          onClick={() => window.location.reload()}
          className="bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-700 transition"
        >
          Volver a intentar
        </button>
        <div className="text-2xl font-bold text-gray-800">
          Nota Obtenida: <span className="text-blue-600">{totalPoints}</span> / {data.length * 5}
        </div>
      </div>
    </div>
  );
}