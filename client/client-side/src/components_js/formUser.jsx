import React, {useState, useEffect, useContext} from "react"

function PlayerForm(props) {
    
    const [newWager, setNewWagers] = useState({
        username: "Nikita",
        game_type: "Chess",
        website: "",
        description: "",
        wager_value: 0,
        currency: "USD"
    })
    const [wagers, setWagers] = useState([
        {
            username: "JokerrNikita",
            game_type: "Chess",
            website: "Chess.com",
            description: "1 game, 3 minute + 1 second addon.",
            wager_value: 5,
            currency: "USD"
        },
    ])

    const [isPlayerExist, setPlayerExist] = useState(false)
    const [playerData, setPlayerData] = useState([]);

    function handleChange(e) {
        const {name, value} = e.target
        setNewWagers(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleChangeAndFetch(e) {
        const {name, value} = e.target
        setNewWagers(prevState => ({
            ...prevState,
            [name]: value
        }));

        await fetch(`http://127.0.0.1:8000/player_valid/${value}`).then((res) => {
            return res.json();
        }).then((data) => {
            const key = Object.keys(data)[0]
            if (data[key] === true) {
                setPlayerExist(true)
                console.log(data)
                console.log(isPlayerExist)
            } else {
                setPlayerExist(false)
            }
        })
        
        if (isPlayerExist === true) {
            await fetch(`http://127.0.0.1:8000/chess/${value}`).then((res) => {
                return res.json();
            }).then((data) => {
                return data['player1'];
            }).then((obj) => {
                for (const dict_obj in obj) {
                    const temp_dict = obj[dict_obj]

                    let updatedPlayerData = [...playerData, temp_dict];

                    setPlayerData(updatedPlayerData)

                }
            })
        } else {
            setPlayerData([])
        }

    }

    function handleSubmit(e) {
        e.preventDefault();

        let updatedWagers = [...wagers, newWager];

        setWagers(updatedWagers)
    }

    return (
        <div className="app">
            <div className="form">
                <div className="form-title">Let's Create A Wager?</div>
                <div className="form-subtitle">Input below details of your wager:</div>
                {isPlayerExist === true && 
                    <div className="games-results">
                        <ul>
                            User: {newWager.username} exist in Chess.com database.
                        </ul>
                    </div>
                }
                {playerData.length > 0 && (playerData.map((current_dict) => (
                    <div className="games-results">
                        <h4>Latest Game Results for Current Month</h4>
                        <ul>
                            <li>{Object.keys(current_dict)[0]} : {Object.values(current_dict)[0]}</li>
                            <li>{Object.keys(current_dict)[1]} : {Object.values(current_dict)[1]}</li>
                            <li>{Object.keys(current_dict)[2]} : {Object.values(current_dict)[2]}</li>
                            <li>{Object.keys(current_dict)[3]} : {Object.values(current_dict)[3]}</li>
                            <li>{Object.keys(current_dict)[4]} : {Object.values(current_dict)[4]}</li>
                            <li>{Object.keys(current_dict)[5]} : {Object.values(current_dict)[5]}</li>
                            <li>{Object.keys(current_dict)[6]} : {Object.values(current_dict)[6]}</li>
                        </ul>
                    </div>
                )))}
                <div className='input-container ic1'>
                    <input
                    id="username"
                    className="input"
                    type="text"
                    name="username"
                    placeholder=" "
                    onChange={handleChangeAndFetch}
                    />
                    <div className="cut"></div>
                    <label for="username" class="placeholder">Your in-game username</label>
                </div>
                <div className='input-container ic2'>
                    <input
                    id="game_type"
                    className="input"
                    type="text"
                    name="game_type"
                    placeholder=" "
                    onChange={handleChange}
                    />
                    <div className="cut"></div>
                    <label for="game_type" className="placeholder">Choose game genre</label>
                </div>
                <div className='input-container ic3'>
                    <input
                    id="website"
                    className="input"
                    type="text"
                    value={newWager.website}
                    name="website"
                    placeholder=" "
                    onChange={handleChange}
                    />
                    <div className="cut"></div>
                    <label for="website" className="placeholder">Website of the game</label>
                </div>
                <div className='input-container ic4'>
                    <input
                    id='description'
                    className="input"
                    type="text"
                    name="description"
                    placeholder=" "
                    onChange={handleChange}
                    />
                    <div className="cut"></div>
                    <label for="website" className="placeholder">Description of the wager</label>
                </div>
                <div className='input-container ic5'>
                    <input
                    id="wager_value"
                    className="input"
                    type="number"
                    name="wager_value"
                    placeholder=" "
                    onChange={handleChange}
                    />
                    <div className="cut"></div>
                    <label for="wager_value" className="placeholder">Bet Amount</label>
                </div>
                <div className='input-container ic6'>
                    <input
                    id='currency'
                    className="input"
                    type="text"
                    name="currency"
                    placeholder=" "
                    onChange={handleChange}
                    />
                    <div className="cut"></div>
                    <label for="currency" className="placeholder">Currency</label>
                </div>
                <button className="submit" onClick={handleSubmit}>
                    Add a Wager
                </button>
            </div>
            <div className="results">
                {wagers.map((wager, index) => (
                    <div className="wagers-list">
                        <div className='wager'>
                                <div>
                                {wager.username}
                                </div>
                                <div>
                                {wager.game_type}
                                </div>
                                <div>
                                {wager.description}
                                </div>
                                <div>
                                {wager.website}
                                </div>
                                <div>
                                {wager.wager_value}
                                </div>
                                <div>
                                {wager.currency}
                                </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export {PlayerForm}