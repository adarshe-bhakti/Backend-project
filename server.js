const { default: axios } = require("axios")
const express = require('express');
const app = express();


app.use(express.json())
app.use(express.urlencoded())

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/pages/home.html')
})
app.get('/login', function (request, response) {
    response.sendFile(__dirname + '/pages/Login.html')
})
app.get('/login-data', function (request, response) {
    console.log('login data: ', request.query)
    let { email, password } = request.query

    axios.get('http://localhost:2211/users')
        .then(function (result) {
            let user = result.data.find(function (record) {
                return record.email === email
            })
            console.log('user data: ', user)
            if (user) {
                if (user.password === password) {
                    response.redirect('/main')
                }
                else {
                    response.send('wrong password')
                }
            }
            else {
                response.send('user does not exists')
            }
        })
        .catch(function (error) {
            console.log(`got some error in login route: ${error}`)
        })

})

app.get('/register', function (request, response) {
    response.sendFile(__dirname + '/pages/Register.html')
})

// Register route
app.post('/register-data', function (request, response) {
    console.log('Data from FrontEnd: ', request.body)
    const { name, email, password, confirm_password } = request.body;

    console.log('Registration data received: ', request.body);


    if (password !== confirm_password) {
        return response.send('Passwords do not match');
    }

    axios.post('http://localhost:2211/users', { name, email, password, confirm_password })
        .then(function () {
            response.redirect('/login')

        })
        .catch(function () {
            response.send('Error while registering the data')

        })


});


app.get('/add-event', function (request, response) {
    response.sendFile(__dirname + '/pages/Add-event.html')
})
app.post('/add-event', function (request, response) {
    console.log(request.body)
    // let {email, password} = request.query


    axios.post('http://localhost:2211/data', request.body)
        .then(function () {
            response.redirect('/main')

        })
        .catch(function () {
            response.send('Failed adding data to API')
        })
})

app.get('/main', function (request, response) {
    console.log('search data: ', request.query);
    const { search } = request.query;

    axios.get('http://localhost:2211/data')
        .then(function (result) {

            if (search) {
                let final_data = result.data.filter(function (record) {
                    // Assuming record has title, location, description, or other event-related fields
                    return record.title.toLowerCase().includes(search.toLowerCase()) ||
                        record.location.toLowerCase().includes(search.toLowerCase()) ||
                        record.eventDate.toLowerCase().includes(search.toLowerCase()) ||
                        record.description.toLowerCase().includes(search.toLowerCase());
                });
                response.render('main.ejs', { data: final_data });

            } else {
                response.render('main.ejs', { data: result.data });
            }
        })
        .catch(function (error) {
            response.send(`Some error in main page: ${error}`);
        });
});

app.get('/edit/:id', function (request, response) {
    console.log('edit id: ', request.params)
    const { id } = request.params
    axios.get(`http://localhost:2211/data/${id}`)
        .then(function (result) {
            console.log('add-event: ', result.data)
            response.render('edit.ejs', { data: result.data })
        })
        .catch(function (error) {
            response.send('Got some error: ', error)
        })
})



// **Update Event Route** (POST)
app.post('/update-event/:id', function (request, response) {
    console.log('Update data of API: ', request.body)
    console.log('Id of Update data of Api: ', request.params.id)

    axios.put(`http://localhost:2211/data/${request.params.id}`, request.body)
        .then(function () {
            response.redirect('/main')
        })
        .catch(function () {
            response.send(`Some Error while Updating event: ${error}`)
        })


});




app.get('/delete/:id', function (request, response) {
    console.log('Delete event ID: ', request.params.id);

    // Use axios to call the backend API to delete the event (assuming the backend API uses DELETE method)
    axios.delete(`http://localhost:2211/data/${request.params.id}`)
        .then(function () {
            // Redirect to the main page or wherever the user needs to go after deletion
            response.redirect('/main');
        })
        .catch(function (error) {
            // Handle any error that occurs during the delete request
            console.log('Error while deleting event: ', error);
            response.send(`Some Error while Deleting event: ${error}`);
        });
});







let port = 3555
app.listen(port, function () {
    console.log(`server is running is port in http://localhost:${port}`)
})











