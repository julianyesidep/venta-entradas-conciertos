from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, Annotated

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if v is not None else v)]

class Entradas(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias='_id')
    evento: str
    zona_asiento: Optional[str] = None
    precio_entrada: int 
    pagada: bool = False

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object:str}
    }

class UpdateEntradas(BaseModel):
    evento: Optional[str] = None
    zona_asiento: Optional[str] = None
    precio_entrada: Optional[int] = None
    pagada: Optional[bool] = None

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders":{object: str}    
    }