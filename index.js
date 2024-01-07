import express from 'express';
import mqtt from 'mqtt';
import mongoose from "mongoose";

import http from 'http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

import { Card } from './model/cardInfo.js';
import { Goods } from './model/goodsModel.js';

const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// const __dirname = dirname(fileURLToPath(import.meta.url));

// middleware for parsing request body
app.use(express.json());

// Create a new MQTT client
const client = mqtt.connect('mqtt://broker.hivemq.com', {
    username: 'hivemq.webclient.1702680632350',
    password: '3QnKD!?Za&i182.SkGbj'
});

// MQTT middleware for publishing and subscribing
app.use(function (req, res, next) {
    // Subscribe to topic
    req.mqttSubscribe = function (topic, callback) {
        client.subscribe(topic, (err) => {
            if (err) {
                console.error('Error subscribing to topic:', err);
            } else {
                console.log('Subscribed to topic successfully');
            }
        })
        client.on('message', function (t, m) {
            if (t === topic) {
                return callback(m.toString())
            }
        })
    }
    next()
})

// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'index.html'));
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     // setInterval(() => {
//     //     socket.emit("rfid/uid", "0410641C700000"); // Gửi message cho client hiện tại
//     // }, 1000); // Gửi message mỗi 1 giây
//     const message = new Promise((resolve, reject) => {
//         client.subscribe('rfid/uid', (err) => {
//             if (err) {
//                 console.error('Error subscribing to topic:', err);
//             } else {
//                 console.log('Subscribed to topic successfully');
//             }
//         });
//         client.on('rfid/uid', (message) =>{
//             socket.emit("rfid/uid", message);
//         })
//     });
// });

// // Route for READ all card
// app.get('/cards', async (req, res) => {
//     try {
//         const cards = await card.find({});

//         return res.status(200).json({
//             count: cards.length,
//             data: cards
//         });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({ message: error.message });
//     }
// });

// // Route for CREATE a new card info 
// app.get('/', async (req, res) => {
//     // Subscribe
//     req.mqttSubscribe('rfid/uid', function (message) {
//         console.log('Received message: ' + message)
//         console.log('Dang ky the')
//         const uid = message.toString();
//         try {
//             const cardInfo = card.findOne({ 'UID': uid });
//             if (cardInfo) {
//                 // Thẻ đã tồn tại
//                 // Hiển thị thông tin thẻ
//                 console.log("Thẻ đã tồn tại");
//             } else {
//                 // Tạo đối tượng thông tin thẻ mới
//                 const newCardInfo = new card({
//                     UID: uid,
//                     // name: req.body.name,
//                     datein: new Date(),
//                     // prize: req.body.prize,
//                     // expiry: req.body.expiry
//                 });

//                 // Lưu thông tin thẻ mới vào cơ sở dữ liệu
//                 const newCard = card.create(newCardInfo);
//                 // Hiển thị thông báo thành công
//                 console.log("Thêm thẻ thành công!");
//                 // res.status(201).send(newCard);
//             }
//         }
//         catch (err) {
//             console.log(err);
//             // res.status(500).send({ message: err.message });
//         }
//         // return res.send(response);
//     })
// });

// app.get('/1', async (req, res) => {
//     // Subscribe
//     req.mqttSubscribe('rfid/uid', function (message) {
//         console.log('Received message: ' + message)
//         console.log('Kiem ke the')
//         const uid = message.toString();
//         try {
//             const cardInfo = card.findOne({ 'UID': uid });
//             if (cardInfo) {
//                 // Thẻ đã tồn tại
//                 // Hiển thị thông tin thẻ
//                 console.log("Thẻ đã tồn tại");
//             } else {
//                 // Tạo đối tượng thông tin thẻ mới
//                 const newCardInfo = new card({
//                     UID: uid,
//                     // name: req.body.name,
//                     datein: new Date(),
//                     // prize: req.body.prize,
//                     // expiry: req.body.expiry
//                 });

//                 // Lưu thông tin thẻ mới vào cơ sở dữ liệu
//                 const newCard = card.create(newCardInfo);
//                 // Hiển thị thông báo thành công
//                 console.log("Thêm thẻ thành công!");
//                 // res.status(201).send(newCard);
//             }
//         }
//         catch (err) {
//             console.log(err);
//             // res.status(500).send({ message: err.message });
//         }
//         // return res.send(response);
//     })
// });



// this code is error
// // Route for create a card 
// app.post('/add', async (req, res) => {
//     // Subscribe MQTT
//     req.mqttSubscribe('rfid/uid', function (message) {
//         console.log('UID: ' + message);
//         try {
//             const newCard = {
//                 UID: message,
//                 name: "test1",
//             }
//             const card = Card.create(newCard);
//             res.setHeader('Content-Type', 'application/json');
//             return res.status(201).json(card);
//         } catch (err) {
//             console.log(err);
//             return res.status(500).send({ message: err.message });
//         }
//     })
// })

// FIX 
// app.post('/add', async (req, res) => {
//     try {
//         // Subscribe to MQTT topic and await the message
//         const message = await new Promise((resolve, reject) => {
//             req.mqttSubscribe('rfid/uid', (msg) => {
//                 resolve(msg);
//             });
//         });

//         console.log('UID: ' + message);

//         const newCard = {
//             UID: message,
//             name: "test1",
//         };
//         const card = await Card.create(newCard);

//         // Send a single response with the created card
//         res.setHeader('Content-Type', 'application/json');
//         res.status(201).json(card);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ message: err.message });
//     }
// });


// Route for get info of card
// If card is not in the database, return UID of card.
// If card is in the database, 
// if is_exported is false, return info of card
// else return UID of card
app.get('/cards/info', async (req, res) => {
    try {
        // Subscribe to MQTT topic and await the message
        const message = await new Promise((resolve, reject) => {
            req.mqttSubscribe('rfid/uid', (msg) => {
                resolve(msg);
            });
        });

        console.log('UID: ' + message);

        const card = await Card.find({ UID: message, is_exported: false });

        // Send a single response with the created card
        res.setHeader('Content-Type', 'application/json');
        if (card) {
            return res.status(200).json(card)
        }
        else {
            return res.status(200).json({ UID: message })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
});

// // Route for get info UID of card from Hive MQTT and check info of UID in database
// app.get('/card/uid', (req, res) => {
//     // Subscribe MQTT
//     req.mqttSubscribe('rfid/uid', function (message) {
//         console.log('UID: ' + message);
//         try {
//             // const cardInfo = Card.findOne({ UID: message });
//             // if (cardInfo) {
//             //     return res.status(200).send(cardInfo);
//             // }
//             // else {
//             //     return res.status(200).send(message)
//             // }
//             return res.status(200).send(message)
//         } catch (err) {
//             console.log(err);
//             return res.status(500).send({ message: err.message });
//         }
//     })
// })

// Route for create a new card
app.post("/cards/register", async (req, res) => {
    try {
        if (!req.body.category_name || !req.body.UID || !req.body.category_id) {
            return respone.status(404).send({
                message: 'Send all required fields: UID, category_name, category_id'
            });
        }

        let cards = []

        req.body.UID.forEach(async (id) => {
            const newCard = {
                UID: id,
                category_name: req.body.category_name,
                category_id: req.body.category_id,
                date_in: req.body.date_in,
                date_out: req.body.date_out,
                is_exported: false
            }
            const card = await Card.create(newCard);
            console.log("card", card);
            cards.push(card);
        });
        console.log("cards: ", cards);

        // return res.status(201).json(cards);
        return res.status(200).send({ 'message': 'Success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message });
    }
});

// Route for display all cards with is_exported = false
app.get("/cards/display", async (req, res) => {
    try {
        // const cards = await Card.find({ 'is_exported': false });
        const cards = await Card.find();
        return res.status(200).json({
            count: cards.length,
            data: cards
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message });
    }
});


// Route for begin invertion or export card
app.post("/goods/begin", async (req, res) => {
    try {
        if (!req.body.name || !req.body.purpose) {
            return res.status(404).send({
                message: 'Send all required fields: name, purpose'
            });
        }
        const newData = {
            name: req.body.name,
            purpose: req.body.purpose,
            begin: req.body.begin,
            end: req.body.end
        }
        const data = await Goods.create(newData);
        console.log(data);
        return res.status(201).send(data._id);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message });
    }
})

// Route for get information about goods
app.get("/goods/display", async (req, res) => {
    try {
        const data = await Goods.find().populate('products');
        return res.status(200).json({
            count: data.length,
            data: data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message });
    }
})

// Route for end invertion or export card
app.put("/goods/end/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const update = {
            products: req.body.products,
            end: Date.now()
        }
        console.log(update);
        const data = await Goods.findByIdAndUpdate(id, update).populate('products');
        return res.status(201).send(data);
    } catch (err) {
        console.log(err);
        return res.status(204).send({ message: err.message });
    }
});


const PORT = 3000;
const mongoDBURL = 'mongodb+srv://root:root1234@book-store-mern.9stubvo.mongodb.net/?retryWrites=true&w=majority';

// connect to mongodb
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        // app.listen(PORT, () => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`)
        });

    })
    .catch((err) => {
        console.log(err);
    });