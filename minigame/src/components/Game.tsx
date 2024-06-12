import React, { useState, useEffect, useRef } from 'react'
import LinearProgress from '@mui/material/LinearProgress'

import correto from '../assets/Som de acerto.mp3'

interface GameProps {
  nivel: 'Easy' | 'Hard'
}

const Easy = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
const Hard = [...Easy, ...Array.from({ length: 10 }, (_, i) => i.toString())]

const Game: React.FC<GameProps> = ({ nivel }) => {
  const [caracteresSorteados, setCaracteresSorteados] = useState<string[]>([])
  const [tempoRestante, setTempoRestante] = useState<number>(0)
  const [resultado, setResultado] = useState<string>('')
  const [indiceAtual, setIndiceAtual] = useState<number>(0)
  const [coresAnteriores, setCoresAnteriores] = useState<string[]>(
    Array(6).fill(''),
  )

  const gameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.focus()
    }
  }, [])

  const sortearCaracteres = (array: string[]) => {
    const caracteresSorteados = []
    const quantidadeCaracteres = 6
    for (let i = 0; i < quantidadeCaracteres; i++) {
      const indiceAleatorio = Math.floor(Math.random() * array.length)
      const caractereSorteado = array[indiceAleatorio]
      caracteresSorteados.push(caractereSorteado)
    }

    setCaracteresSorteados(caracteresSorteados)
  }

  useEffect(() => {
    const tempoInicial = nivel === 'Easy' ? 10 : 3

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    const tecla = event.key.toUpperCase()
    const esperado = caracteresSorteados[indiceAtual]
    const newCoresAnteriores = [...coresAnteriores]
    const audioCorreto = new Audio()

    if (tecla === esperado) {
      newCoresAnteriores[indiceAtual] = 'bg-green-500'
      setResultado('Caractere correto!')
    } else {
      newCoresAnteriores[indiceAtual] = 'bg-red-500'
      setResultado('Caractere incorreto!')
    }

    setCoresAnteriores(newCoresAnteriores)

    if (indiceAtual === 5) {
      // Último caractere
      if (tecla === esperado) {
        setResultado('Você completou a sequência corretamente!')
      }
    } else {
      setIndiceAtual((prevIndice) => prevIndice + 1)
    }
  }

  return (
    <div
      ref={gameRef}
      className="text-yellow-50 min-w-[500px] flex flex-col items-center w-full outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="p-4 w-full">
        <div className="flex gap-8">
          {caracteresSorteados.map((caractere, index) => (
            <div
              key={index}
              className={`flex text-slate-950 rounded-lg text-2xl p-2 px-4 font-bold ${
                index === indiceAtual ? 'bg-blue-500 text-white' : ''
              } ${coresAnteriores[index]}`}
            >
              {caractere}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p>Tempo restante: {tempoRestante} segundos</p>
        <LinearProgress
          variant="determinate"
          value={(indiceAtual / 6) * 100}
          className="py-1 rounded-3xl"
        />
        <p>{resultado}</p>
      </div>
    </div>
  )
}

export default Game
