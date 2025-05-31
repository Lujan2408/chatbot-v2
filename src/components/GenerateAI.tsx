import { useState } from "react"
import ErrorMessage from "./ErrorMessage"
import { useAppStore } from "../stores/useAppStore"

export default function GenerateAI() {

  const isGenerating = useAppStore(state => state.isGenerating) 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const prompt = form.get('prompt') as string

    if (prompt.trim() === '') {
      setError('¡La consulta no puede ir vacía!')
      return
    }

    setError('')
  }

  const [error, setError] = useState('')

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
              <input
                name="prompt"
                id="prompt"
                className="border border-none bg-white p-4 rounded-full w-full text-sm font-medium sm:text-base"
                placeholder="¿Qué deseas hacer?"
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
              {/* {chatAnswer ? (
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
              )} */}
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
  )
}
