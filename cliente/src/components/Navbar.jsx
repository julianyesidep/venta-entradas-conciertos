import { Link } from "react-router-dom";

function Navbar(){
    return(
        <header className="flex justify-between items-center py-5 border-b border-zinc-800 mb-8 px-4 sm:px-8">
            <Link to={"/"}>
                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                    Fast<span className="text-indigo-500">Ticket</span>
                </h1>
            </Link>
            <Link
                to={"entradas/new"}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
            >
                Crear Entrada
            </Link>
        </header>
    );
}

export default Navbar;