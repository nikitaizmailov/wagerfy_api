import asyncio
import requests

import pandas as pd
import numpy as np

import json
import re
from datetime import datetime

# Использовать OAuth для аутентификации пользователей не через мою базу данных а позволить им зайти по Facebook или Instagram или VK логину.

# Check if inputted player exist. So that later we can bring all the games history played.
def isPlayerExist(username):
    try:
        url = f"https://api.chess.com/pub/player/{username}"
        response = requests.get(url)
        if response.status_code == 404:
            raise ValueError("Such username was not found")
    except ValueError as e:
        print(e)
        print(f"{str(response.status_code)} error. {response.reason}")
        # Return false if not found.
        return False
    else:
        return True


current_date = datetime.now().date()
current_month = current_date.strftime("%m")
current_year = current_date.strftime("%Y")

lost_status = ['abandoned', 'checkmated', 'resigned', 'lose', 'timeout']
draw_status = ['stalemate', 'repetition', 'agreed']
win_status = ['win']

# Storing the user's games and respective result won/lost for each game. Key 1, represents game 1 the user played.
def player_games_history(player_games_data, username, year = current_year, month = current_month):
    
    url_latest_games_for_username = f" https://api.chess.com/pub/player/{username}/games/{year}/{month}"
    
    try:
        response = requests.get(url_latest_games_for_username)
        if response.status_code == 404:
            raise ValueError("Such username was not found. Error 404")
    except ValueError as e:
        print(e)
        
    else:
        games_history = response.json()
        usr_games_history = games_history['games']
        
        # Creating a dictionary of player's games history
        for idx, game_dict in enumerate(usr_games_history):
            
            # grabbing date and time for when the game was played.
            txt_string = game_dict['pgn']
            
            date_game = re.findall('\d{4}.\d{2}.\d{2}', txt_string)[0]
            time_game = re.findall('\d{2}:\d{2}.\d{2}', txt_string)[-1]

            
            
            # grabbing each game dictionary/obj
            white_outcome = game_dict['white']['result']
            black_outcome = game_dict['black']['result']

            white_username = game_dict['white']['username']
            black_username = game_dict['black']['username']

            if white_username == username:
                player_games_data[idx + 1] = {white_username: white_outcome, black_username: black_outcome, "white": white_username, "black": black_username}
            elif black_username == username:
                player_games_data[idx + 1] = {black_username: black_outcome, white_username: white_outcome, "black": black_username, "white": white_username}

            # Who won?
            if white_outcome in lost_status:
                player_games_data[idx + 1]['whoWon'] = "black"
            elif white_outcome in draw_status:
                player_games_data[idx + 1]['whoWon'] = "draw"
            elif white_outcome in win_status:
                player_games_data[idx + 1]['whoWon'] = "white"
            
            player_games_data[idx + 1]['date'] = date_game
            player_games_data[idx + 1]['time'] = time_game
            
        return player_games_data