const TelegramApi = require('node-telegram-bot-api');
/*const {options} = () => require('options');*/


const token = '5609004605:AAFs4dE5NJzML5E0Oy_uh9XhB_5DWUZ0Qls'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Ugaday Cufry ot 0 do 9`)
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await  bot.sendMessage(chatId, 'Otgaday', gameOptions)

}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'начальное приветствие'},
        {command: '/info', description: 'начальное приветствие'},
        {command: '/game', description: 'начать игру'},

    ])


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chatId, 'telgram.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
           return  await bot.sendMessage(chatId, `Привет, я котик Мантикоре, Ты написал мне) ${text}`)
        }

        if (text === '/info') {
          return   await bot.sendMessage(chatId, `yOR nAmE ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') {
          return startGame(chatId)
            }

        return bot.sendMessage(chatId, `dont andersTendYou ${msg.first_name} try Agein`)

    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id
        if(data === '/again'){
          return  startGame(chatId)
        }
        if(data === chats[chatId]){
            return await bot.sendMessage(chatId, `yrAAA tu Otgadal) cuFry ${chats[chatId]}`, options.againOptions) ;
        }else {
            return await bot.sendMessage(chatId, `Prosty, Sorrryyyy , tu ne  otgadal, ManticoreCat zagadal cufry ${chats[chatId]}`, options.againOptions) ;

        }
    })

}

start()