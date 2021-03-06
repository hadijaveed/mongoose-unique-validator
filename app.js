/**
 *
 * Testing unique validator here
 *
 */
const mongoose = require('mongoose'),
    uniqueValidator = require('./index');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    contacts: [{
        email: {
            type: String,
            index: true,
            unique: 'should be unique'
        }
    }],
    password: {
        type: String
    }
});

userSchema.plugin(uniqueValidator, { code: 2222 });

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/unique-test');

mongoose.connection.once('connected', (err) => {
    if (err) throw err;
    // User.update({
    //     email: 'hadij.pk@gmail.com'
    // }, { email: 'saadj.pk@gmail.com' }, (err, result) => {
    //     if (err) console.log('see error here ', JSON.stringify(err, null, 2));
    //     console.log('see result here ', result);
    // });
    User.create({
        email: 'hadi',
        contacts: [{
            email: 'hadij.pk@gmail.com'
        }],
        password: 'molana'
    }, (err, result) => {
        if (err) console.log('see error here ', JSON.stringify(err, null, 2));
        console.log('see result here ', result);
    });
});
