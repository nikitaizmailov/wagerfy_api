from unittest.mock import Base
from pydantic import BaseModel
from typing import Optional
from fastapi import FastAPI

from chess_api import isPlayerExist, player_games_history

app = FastAPI()

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

@app.get("/chess")
def game_results(player1: str, player2: str, limit: Optional[int] = None):

    try:
        isPlayer1 = isPlayerExist(player1)
        isPlayer2 = isPlayerExist(player2)
        
        if isPlayer1 == False and isPlayer2 == False:
            raise ValueError("Both usernames do not exist.")
        elif isPlayer1 == False and isPlayer2 == True:
            raise ValueError(f"Username: {player1} does not exist.")
        elif isPlayer1 == True and isPlayer2 == False:
            raise ValueError(f"Username: {player2} does not exist.")

    except ValueError as e:
        return {"Error": e.args}
    else:
        player1_games_data = player_games_history({}, player1)
        player2_games_data = player_games_history({}, player2)
        return {
            "player1": player1_games_data,
            "player2": player2_games_data
        }