import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEntrada, createEntrada, updateEntrada, deleteEntrada } from "../api/entidades";

function TicketForm() {
  const [evento, setEvento] = useState("");
  const [zona_entrada, setZona_Entrada] = useState("");
  const [precio_entrada, setPrecio_Entrada] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if(!params.id){
        const res = await createEntrada({ evento, zona_entrada, precio_entrada });
        console.log(res);
      } else {
        const res = await updateEntrada(params.id, { evento, zona_entrada, precio_entrada });
        console.log(res);
      }
      navigate("/");
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchEntrada(params.id)
      .then((res) => {
        setEvento(res.data.evento);
        setZona_Entrada(res.data.zona_entrada);
        setPrecio_Entrada(res.data.precio_entrada);
      })
      .catch((err) => console.log(err));
    }
  }, [params.id]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <div className="w-full max-w-md">
        <form className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            {params.id ? "Actualizar Información" : "Crear Nueva Entrada"}
          </h1>
          
          <div className="mb-4">
            <label className="block text-zinc-400 text-sm font-medium mb-2">Evento</label>
            <input 
              type="text" 
              placeholder="Nombre del evento"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 px-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              onChange={(e) => setEvento(e.target.value)}
              value={evento}
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block text-zinc-400 text-sm font-medium mb-2">Zona de Entrada</label>
            <input 
              type="text" 
              placeholder="Ej. VIP, General, Palco"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 px-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              onChange={(e) => setZona_Entrada(e.target.value)}
              value={zona_entrada}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-zinc-400 text-sm font-medium mb-2">Precio (COP)</label>
            <input 
              type="number" 
              placeholder="0.00"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 px-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              onChange={(e) => setPrecio_Entrada(e.target.value)}
              value={precio_entrada}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transition-colors"
          >
            {params.id ? "Actualizar Entrada" : "Crear Entrada"}
          </button>
        </form>

        {params.id && (
          <button 
            className="w-full mt-4 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-800 font-semibold py-2.5 px-4 rounded-lg transition-all"
            onClick={async () => {
              if (window.confirm("¿Estás seguro de que deseas borrar esta entrada?")) {
                try {
                  const res = await deleteEntrada(params.id);
                  console.log(res);
                  navigate("/"); 
                } catch(error) {
                  console.log(error);
                }
              }
            }}
          >
            Borrar Entrada
          </button>
        )}
      </div>
    </div>
  );
}

export default TicketForm;