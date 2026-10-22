import EntradaCard from "./TicketCard";

function EntradaList({entradas}){
    return(
    <div className="grid grid-cols-3 gap-4">
        {entradas.map((entrada) =>(
            <EntradaCard entrada={entrada} key={entrada._id}/>
            ))}
            </div>
    );
}

export default EntradaList