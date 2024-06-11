import Button from '@mui/material/Button'

function Initial() {
  return (
    <div className="flex justify-center border rounded-xl border-yellow-100  ">
      <div className="min-w-[500px] min-h-[250px] bg-slate-900 rounded-xl ">
        <div>
          <span></span>
          <h1 className="text-center text-slate-50 text-2xl font-semibold py-2">
            MINI-GAME
          </h1>
        </div>

        <ul className=" flex flex-col gap-20 ">
          <li>
            <p className="bg-yellow-200 text-center text-white text-lg mt-8">
              Clique no botão abaixo para iniciar
            </p>
          </li>
          <li className="grid p-2">
            <Button variant="contained" className="h-full w-full bg-black">
              Iniciar
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Initial
