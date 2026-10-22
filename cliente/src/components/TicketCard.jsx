import { useNavigate } from "react-router-dom";
import { updateEntrada } from "../api/entidades";

function TicketCard({ entrada }) {
    const navigate = useNavigate();
    
    return (
        <div 
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg hover:border-zinc-700 hover:shadow-indigo-500/10 transition-all duration-200 cursor-pointer flex flex-col justify-between" 
            onClick={() => {
                navigate(`/tareas/${entrada._id}`);
            }}
        >
            <div>
                <div className="flex justify-between items-start gap-4 mb-3">
                    <h2 className="font-bold text-xl text-white tracking-wide">{entrada.evento}</h2>
                    <button 
                        className="p-1 hover:bg-zinc-800 rounded-full transition-colors"
                        onClick={async (e) => {
                            e.stopPropagation();
                            const res = await updateEntrada(entrada._id, { pagada: !entrada.pagada });
                            if (res.status === 200) {
                                window.location.reload();
                            }
                        }}
                        title="Cambiar estado de pago"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${entrada.pagada ? 'text-emerald-400' : 'text-zinc-500'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                <p className="text-zinc-400 text-sm mb-1">
                    <span className="font-medium text-zinc-300">Zona:</span> {entrada.zona_entrada || entrada.zona_asiento || 'General'}
                </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
                <span className="text-emerald-400 font-bold text-lg">${entrada.precio_entrada} COP</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${entrada.pagada ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                    {entrada.pagada ? 'Pagada' : 'Pendiente'}
                </span>
            </div>
        </div>
    );
}

export default TicketCard;