import fetch from "node-fetch";

const result = await fetch(`http://127.0.0.1:8000/chess/Hikaru`).then((res) => {
    return res.json();
}).then((data) => {
    return data['player1']
}).then((obj) => {
    for (const dict_obj in obj) {
        const temp_dict = obj[dict_obj]

        console.log(temp_dict)
    }
})