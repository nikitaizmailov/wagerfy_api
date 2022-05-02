from unittest.mock import Base
from pydantic import BaseModel
from typing import Optional
from fastapi import FastAPI

from chess_api import isPlayerExist, player_games_history

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Doing Data Validation
class Item(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id, "price": item.price}

@app.get("/player_valid/{username}")
def validate_ingame_user(username: str):

    userExist = isPlayerExist(username)

    return {username: userExist}

@app.get("/chess/{player1}")
def game_results(player1: str, limit: Optional[int] = None):

    try:
        isPlayer1 = isPlayerExist(player1)

    except ValueError as e:
        return {"Error": e.args}
    else:
        player1_games_data = player_games_history({}, player1)
        
        return {
            "player1": player1_games_data,
        }