import Button from '@mui/material/Button'

interface InitialProps {
  onSelectDifficulty: (nivel: 'Easy' | 'Hard') => void
}
const Initial: React.FC<InitialProps> = ({ onSelectDifficulty }) => {
  return (
    <div className="flex justify-center  rounded-xl  ">
      <div className="min-w-[500px] min-h-[250px] bg-slate-900 rounded-xl ">
        <ul className=" flex flex-col gap-20 ">
          <li>
            <p className="text-center text-white text-lg mt-8">
              Escolha a dificuldade do jogo!
            </p>
          </li>
          <li className="flex gap-3 p-2">
            <Button
              onClick={() => onSelectDifficulty('Easy')}
              variant="contained"
              className="h-full w-full bg-black"
            >
              Easy
            </Button>
            <Button
              onClick={() => onSelectDifficulty('Hard')}
              variant="contained"
              className="h-full w-full bg-black"
            >
              Hard
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Initial
