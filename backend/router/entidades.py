from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import get_todas_entradas, get_one_entrada_id, get_entrada_por_evento, update,create_entrada,delete_entrada
from models import Entradas, UpdateEntradas

entrada = APIRouter()

@entrada.get('/api/entradas')
async def get_entradas():
    entradas = await get_todas_entradas()
    return entradas


@entrada.post('/api/entradas')
async def save_entradas(entradas: Entradas):
    entrada_existente = await get_entrada_por_evento(entradas.evento)

    if entrada_existente:
        raise HTTPException(status_code=400, detail="La entrada ya ha sido registrada")
    
    dict_entrada = entradas.model_dump()

    if dict_entrada.get('id') is None:
        del dict_entrada['id']

    responsive = await create_entrada(dict_entrada)

    return responsive


@entrada.get('/api/entradas/{id}')
async def get_entrada(id: str):
    entradas = await get_one_entrada_id(id)
    if entradas:
        return entradas
    raise HTTPException(404, f'La entrada con {id} no ha sido encontrada')


@entrada.put('/api/entradas/{id}')
async def put_entradas(id: str, entradas: UpdateEntradas):
    response = await update(id, entradas)
    if response:
        return response
    raise HTTPException(404, f'Entrada {id} no encontrada')


@entrada.delete('/api/entradas/{id}')
async def remove_entradas(id: str):
    response = await delete_entrada(id)
    if response:
        return 'Entrada eliminada Satisfactoriamente'
    raise HTTPException(404, f'Entrada {id} no encontrada')