import fetch from "node-fetch";

const result = await fetch(`http://127.0.0.1:8000/player_valid/Hikaru`).then((res) => {
    return res.json();
}).then((data) => {
    return data['Hikaru']
})

console.log(result)