import { useEffect, useState } from "react";
import { fetchEntradas } from "../api/entidades";
import TicketList from "../components/TicketList";
import { Link } from "react-router-dom";

function Homepage(){
  const [entradas, setEntradas] = useState([]);
  
  useEffect(()=>{
    fetchEntradas()
    .then(res => {
      setEntradas(res.data);
    })
    .catch((err) => console.log(err));
  },[]);

  return(
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/45 via-zinc-900 to-zinc-950 border border-zinc-800 p-8 sm:p-16 text-center shadow-2xl">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Plataforma Oficial de FastTicket
          </span>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Vive la música en vivo <span className="text-indigo-500">sin límites</span>
          </h1>
          
          <p className="text-zinc-400 text-lg sm:text-xl font-normal max-w-2xl mx-auto">
            Encuentra, compra y gestiona entradas para los conciertos, festivales y eventos más grandes de forma rápida, segura y al mejor precio.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/entradas/new"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200"
            >
              Vender mi Entrada
            </Link>
            
            <a
              href="#eventos"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-xl border border-zinc-700 transition-all duration-200"
            >
              Explorar Conciertos
            </a>
          </div>
        </div>
      </section>

      {/* Sección de Listado de Entradas */}
      <section id="eventos" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white tracking-wide">Conciertos Disponibles</h2>
          <span className="text-zinc-400 text-sm font-medium">Total: {entradas.length}</span>
        </div>
        
        <TicketList entradas={entradas} />
      </section>
    </div>
  );
}

export default Homepage;