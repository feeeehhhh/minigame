import React, { ReactNode, createContext, useContext, useState } from 'react'

interface CaracterProviderProps {
  children: ReactNode
}
interface CaracterContextType {
  exemplo: string
  setExemplo: React.Dispatch<React.SetStateAction<string>>
}

const CaracterContext = createContext<CaracterContextType | undefined>(
  undefined,
)

export const CaracterProvider: React.FC<CaracterProviderProps> = ({
  children,
}) => {
  const [exemplo, setExemplo] = useState('Valor inicial')
  return (
    <CaracterContext.Provider value={{ exemplo, setExemplo }}>
      {children}
    </CaracterContext.Provider>
  )
}

export const useCaracterContext = () => {
  const context = useContext(CaracterContext)
  if (context === undefined) {
    throw new Error(
      'useCaracterContext deve ser usado dentro de um CaracterProvider',
    )
  }
  return context
}
