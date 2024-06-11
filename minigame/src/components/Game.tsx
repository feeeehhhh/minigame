import React, { useState, useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress'

interface GameProps {
  nivel: 'Easy' | 'Hard'
}

const Easy = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

const Hard = [...Easy, ...Array.from({ length: 10 }, (_, i) => i.toString())]

const Game: React.FC<GameProps> = ({ nivel }) => {
  const [caracteresSorteados, setCaracteresSorteados] = useState<string[]>([])
  const [tempoRestante, setTempoRestante] = useState<number>(0)
  const [resultado, setResultado] = useState<string>('')
  const [tempoInicial, setTempoInicial] = useState<number>(0)

  const sortearCaracteres = (array: string[]) => {
    const caracteres = []
    for (let i = 0; i < 6; i++) {
      const indiceSorteado = Math.floor(Math.random() * array.length)
      caracteres.push(array[indiceSorteado])
    }
    setCaracteresSorteados(caracteres)
  }

  useEffect(() => {
    const tempoInicial = nivel === 'Easy' ? 10 : 3
    setTempoInicial(tempoInicial)
    setTempoRestante(tempoInicial)
    const arrayParaSortear = nivel === 'Easy' ? Easy : Hard
    sortearCaracteres(arrayParaSortear)
  }, [nivel])

  useEffect(() => {
    if (tempoRestante > 0) {
      const temporizador = setTimeout(() => {
        setTempoRestante(tempoRestante - 1)
      }, 1000)
      return () => clearTimeout(temporizador)
    } else if (tempoRestante === 0) {
      setResultado('Tempo esgotado!')
    }
  }, [tempoRestante])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const teclaPressionada = event.key.toUpperCase()
    if (caracteresSorteados.includes(teclaPressionada)) {
      setResultado('Caractere correto!')
    } else {
      setResultado('Caractere incorreto!')
    }
  }
  const progress = (tempoRestante / tempoInicial) * 100

  return (
    <div
      className="text-yellow-50 min-w-[500px] flex flex-col items-center w-full"
      onKeyPress={handleKeyPress}
      tabIndex={0}
    >
      <div className="p-4 w-full">
        <p>Pressione as teclas abaixo no seu teclado:</p>
        <ul className="flex gap-8">
          {caracteresSorteados.map((caractere, index) => (
            <li
              key={index}
              className="flex  bg-slate-50 text-slate-950 rounded-lg text-2xl p-2 px-4 font-bold"
            >
              {caractere}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>Tempo restante: {tempoRestante} segundos</p>
        <LinearProgress
          variant="determinate"
          value={progress}
          className=" py-1 rounded-3xl"
        />
        <p>{resultado}</p>
      </div>
    </div>
  )
}

export default Game
