const express = require('express');
const JoiSchema = require('../models/validation');
const TodoList = require('../models/todo');
const router = express.Router();



// get items from mongo DB
router.get('/', async (req, res) => {

    try {
        const todoList = await TodoList.find();
        return res.render('todo', {
            items: todoList,
            dots: '...'
        });

    } catch (err) {
        return console.log(err);
    }

});


// save item to DB
router.post('/newtodo', async (req, res) => {

    // Joi validation
    try {
        const value = await JoiSchema.validateAsync(req.body);
        console.log(`Validation was success. / Input text: ${value.text}`);

    } catch (err) {
        console.log(`Validator message: ${err.message}`);
        return res.redirect('/');
    };


    const item = {
        text: req.body.text
    };

    const todoList = new TodoList(item);
    try {
        const savedTodoList = await todoList.save();
        return res.redirect('/');

    } catch (err) {
        return console.log(err);
    }

});


// delete item from DB
router.delete('/', async (req, res) => {

    try {
        const deletedItem = await TodoList.findByIdAndRemove({
            _id: req.body._id
        });
        return res.redirect('/');

    } catch (err) {
        return console.log(err);
    }

});


// get edited item
router.get('/todoedit/:id', (req, res) => {

    const itemId = req.params.id;

    return res.render('todo-edit', {
        title: 'Rename item...',
        itemId: itemId
    });

});


// edit item in DB
router.post('/todoedit/:id', async (req, res) => {

    // Joi validation
    try {
        const value = await JoiSchema.validateAsync(req.body);
        console.log(`Validation was success. / Input text: ${value.text}`);

    } catch (err) {
        console.log(`Validator message: ${err.message}`);
        return res.redirect('/todoedit/' + req.params.id);
    };


    const itemId = req.params.id;

    try {
        const editedItem = await TodoList.updateOne({
            _id: itemId
        }, {
            $set: {
                text: req.body.text
            }
        });
        return res.redirect('/');

    } catch (err) {
        return console.log(err);
    }

});


// get deleted item 
router.get('/tododelete/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
        const itemText = await TodoList.findOne({
            _id: itemId
        });

        return res.render('todo-delete', {
            title: 'Delete item?',
            itemId: itemId,
            itemText: itemText
        });
    } catch (err) {
        return console.log(err);
    }

});


// delete item from DB
router.post('/tododelete/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
        const deletedItem = await TodoList.findByIdAndDelete({
            _id: itemId
        });
        return res.redirect('/');

    } catch (err) {
        return console.log(err);
    }

});


module.exports = router;