from motor.motor_asyncio import AsyncIOMotorClient
from models import Entradas, UpdateEntradas
from bson import ObjectId

cliente = AsyncIOMotorClient('mongodb://localhost')
database = cliente.entradasdatabase
coleccion = database.entradas


async def get_one_entrada_id(id):
    entrada = await coleccion.find_one({'_id': ObjectId(id)})
    if entrada:
        entrada['_id'] = str(entrada['_id'])
    return entrada


async def create_entrada(entrada):
    new_entrada = await coleccion.insert_one(entrada)
    created_entrada = await coleccion.find_one({
        '_id': new_entrada.inserted_id
    })

    if created_entrada:
        created_entrada['_id'] = str(created_entrada['_id'])

    return created_entrada


async def get_todas_entradas():
    entradas = []
    cursor = coleccion.find({})

    async for document in cursor:
        document['_id'] = str(document['_id'])
        entradas.append(Entradas(**document))

    return entradas


async def update(id: str, data: UpdateEntradas):
    entradas = data.model_dump(by_alias=True,exclude_unset=True)
    entradas.pop('_id',None)
    await coleccion.update_one({'_id':ObjectId(id)},{'$set': entradas})
    document = await coleccion.find_one({'_id':ObjectId(id)})

    if document:
        document['_id'] = str(document['_id'])
    return document


async def delete_entrada(id: str):
    await coleccion.delete_one({'_id': ObjectId(id)})
    return True


async def get_entrada_por_evento(evento: str):
    entrada = await coleccion.find_one({'evento': evento})
    return entrada