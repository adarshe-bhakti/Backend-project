app.post('/events', authenticateToken, async (req, res) => {
    const { title, description, date, location, maxAttendees } = req.body;

    const newEvent = new Event({ title, description, date, location, maxAttendees });
    await newEvent.save();

    res.status(201).send('Event created successfully');
});


app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});
