import { useRef, useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import { useAppStore } from "../stores/useAppStore";

export default function GenerateAI() {
  const isGenerating = useAppStore((state) => state.isGenerating);
  const generateAnswer = useAppStore((state) => state.generateAsnwer);
  const chatAnswer = useAppStore((state) => state.chat);
  const [error, setError] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const prompt = form.get("prompt") as string;

    if (prompt.trim() === "") {
      setError("¡La consulta no puede ir vacía!");
      return;
    }

    setError("");
    await generateAnswer(prompt);

    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleInput();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-slate-800">
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl text-white font-extrabold">
            ¡Bienvenido!
          </h1>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <div className="relative w-full">
              <textarea
                ref={textareaRef}
                name="prompt"
                id="prompt"
                rows={1}
                onInput={handleInput}
                placeholder="¿Qué deseas hacer?"
                className="w-full max-w-3xl p-4 pr-12 rounded-3xl bg-white text-sm sm:text-base font-medium resize-none overflow-hidden transition-all duration-100 max-h-48"
              />
              <button
                type="submit"
                aria-label="Enviar"
                className={`cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 ${
                  isGenerating ? "cursor-not-allowed opacity-30" : ""
                }`}
                disabled={isGenerating}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {isGenerating && (
            <p className="mb-10 font-semibold text-slate-50">Generando...</p>
          )}

          <div className="flex justify-center mt-20">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 max-w-full sm:max-w-2xl text-white text-left w-full">
              {chatAnswer ? (
                <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                  {chatAnswer}
                </p>
              ) : (
                <div className="text-gray-300 italic text-center text-sm sm:text-base">
                  <h2 className="text-base sm:text-lg font-semibold mb-2">
                    Por favor escribe algo en el campo de arriba :)
                  </h2>
                  <p>
                    Escribe tu consulta y presiona enviar para obtener una
                    respuesta.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-4 md:p-8">
        <img
          src="/robot-face-amico.svg"
          alt="Imagen robot"
          className="w-40 sm:w-64 md:w-full h-auto"
        />
      </div>
    </div>
  );
}
