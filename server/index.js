const express = require('express');
const cors = require('cors');
const Axios = require('axios');
const qs = require('qs')

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post('/compile', (req, res) => {

    //getting the required data from the request
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;

    if (language === "python") {
        language = "py"
    }

    let data = qs.stringify({
        'code': code,
        'language': language,
        'input': input
    });
    console.log("data back", data)

    // //calling the code compilation API
    let config = {
        method: 'post',
        url: 'https://api.codex.jaagrav.in',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    Axios(config)
        .then((response) => {
            console.log("api response", response.data)
            if(!response.data.output && !response.data.error){
                response.data.output = "No Output to Display !"
                console.log(response.data)
            }
            res.send(JSON.stringify(response.data));
        })
        .catch((error) => { console.log("error", error) });

});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});