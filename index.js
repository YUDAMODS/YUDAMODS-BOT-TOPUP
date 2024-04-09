
require('./setting')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const { getAggregateVotesInPollMessage, downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@whiskeysockets/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./lib/console.js')
const { isUrl, getRandom, getGroupAdmins, runtime, sleep, reSize, makeid, fetchJson, getBuffer } = require("./lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/addlist');
const { addResponTesti, delResponTesti, isAlreadyResponTesti, sendResponTesti, updateResponTesti, getDataResponTesti } = require('./lib/respon-testi');
const { addResponProduk, delResponProduk, resetProdukAll, isAlreadyResponProduk, sendResponProduk, updateResponProduk, getDataResponProduk } = require('./lib/respon-produk');
// apinya
const fs = require("fs");
const chalk = require('chalk');
const axios = require("axios");
const speed = require("performance-now");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const { TelegraPh, UploadFileUgu } = require('./lib/Upload_Url');
const fetch = require('node-fetch');
const jimp = require('jimp')
const qs = require("qs");
const toMs = require('ms');
const ms = require('parse-ms');


// Database
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const antilink2 = JSON.parse(fs.readFileSync('./database/antilink2.json'));
const mess = JSON.parse(fs.readFileSync('./mess.json'));
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));
const db_respon_testi = JSON.parse(fs.readFileSync('./database/list-testi.json'));
const db_respon_produk = JSON.parse(fs.readFileSync('./database/list-produk.json'));
const { addSaldo, minSaldo, cekSaldo } = require("./lib/deposit");
let db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));
const {payment, apikeyAtlantic } = require("./setting")
let depositPath = "./database/deposit/"
let topupPath = "./database/topup/"

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(yudamods, msg, m, setting, store) => {
try {
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
global.prefa = ['','.']
const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${global.ownerNumber}`,"6283153305709@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = chats.startsWith(prefix);
const command = chats.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? chats.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = yudamods.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await yudamods.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false
const isAntiLink2 = antilink.includes(from) ? true : false
const isWelcome = isGroup ? welcome.includes(from) : false

// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = yudamods.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = yudamods.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

async function downloadAndSaveMediaMessage (type_file, path_file) {
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
fs.writeFileSync(path_file, buffer)
return path_file } 
else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file}
}

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

function randomNomor(min, max = null) {
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}

const reply = (teks) => {yudamods.sendMessage(from, { text: teks }, { quoted: msg })}

//Antilink
if (isGroup && isAntiLink && isBotGroupAdmins){
if (chats.includes(`https://chat.whatsapp.com/`) || chats.includes(`http://chat.whatsapp.com/`)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await yudamods.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
yudamods.groupParticipantsUpdate(from, [sender], "remove")
}
}

//Antilink 2
if (isGroup && isAntiLink2 && isBotGroupAdmins){
if (chats.includes(`https://chat.whatsapp.com/`) || chats.includes(`http://chat.whatsapp.com/`)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await yudamods.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
}
}

// Response Addlist
if (isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
yudamods.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
yudamods.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {quoted: msg})
}
}
if (!isGroup && isAlreadyResponTesti(chats, db_respon_testi)) {
var get_data_respon = getDataResponTesti(chats, db_respon_testi)
yudamods.sendMessage(from, { image: { url: get_data_respon.image_url }, caption: get_data_respon.response }, { quoted: msg })
}
if (!isGroup && isAlreadyResponProduk(chats, db_respon_produk)) {
var get_data_respon = getDataResponProduk(chats, db_respon_produk)
yudamods.sendMessage(from, { image: { url: get_data_respon.image_url }, caption: get_data_respon.response }, { quoted: msg })
}

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return yudamods.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}


const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `Bot Created By ${global.ownerName}\n`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${global.botName},;;;\nFN:Halo ${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: `${global.qris}` }}}}
function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

if (chats === "payment_ovo") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "OVO",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
} else if (chats === "payqris") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "QRIS",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
} else if (chats === "paydana") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "DANA",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "amount") {
if (isNaN(chats)) return reply("Masukan hanya angka ya")
data_deposit.data.amount_deposit = Number(chats);
if (data_deposit.data.amount_deposit < 1500) return reply(`Deposit Minimal Rp1.500`)
data_deposit.session = "konfirmasi_deposit";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`「 𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏 」

▪ ID : ${data_deposit.ID}
▪ Nomer : ${data_deposit.number.split('@')[0]}
▪ Payment : ${data_deposit.payment}
▪ Jumlah Deposit : Rp${toRupiah(data_deposit.data.amount_deposit)}
▪ Pajak Admin : Rp0
▪ Total Pembayaran : Rp${toRupiah(data_deposit.data.amount_deposit)}

_Deposit akan dibatalkan otomatis apabila terdapat kesalahan input._

_Ketik Lanjut untuk melanjutkan_
_Ketik Batal untuk membatalkan_`)
} else if (data_deposit.session === "konfirmasi_deposit") {
if (chats.toLowerCase() === "lanjut") {
if (data_deposit.payment === "OVO") {
var py_ovo=`༆━━[ *PAYMENT OVO* ]━━࿐
 
*Nomer :* ${payment.ovo.nomer}
*AN :* ${payment.ovo.atas_nama}

_Silahkan transfer dengan nomor yang sudah tertera, Jika sudah harap kirim bukti foto dengan caption #bukti untuk di acc oleh admin_`
reply(py_ovo)
} else if (data_deposit.payment === "QRIS") {
var qr_fexf =`༆━━[ *PAYMENT QRIS* ]━━࿐
 
*Url :* ${payment.qris.link_nya}
*AN :* ${payment.qris.atas_nama}

_Silahkan transfer dengan nomor yang sudah tertera, Jika sudah harap kirim bukti foto dengan caption #bukti untuk di acc oleh admin_`
yudamods.sendMessage(from, {image:{url:payment.qris.link_nya}, caption:qr_fexf}, {quoted: msg})
} else if (data_deposit.payment === "DANA") {
var py_dana =`༆━━[ *PAYMENT DANA* ]━━࿐
 
*Nomer :* ${payment.dana.nomer}
*AN :* ${payment.dana.atas_nama}

_Silahkan transfer dengan nomor yang sudah tertera, Jika sudah harap kirim bukti foto dengan caption #bukti untuk di acc oleh admin_`
reply(py_dana)
}} else if (chats.toLowerCase() === "batal") {
reply(`Baik kak, Deposit Dengan ID : ${data_deposit.ID} dibatalkan 😊`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}}}}

if (fs.existsSync(topupPath + sender.split("@")[0] + ".json")) {
let data_topup = JSON.parse(fs.readFileSync(topupPath + sender.split("@")[0] + ".json"))
var intervals = setInterval(function() {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("id", data_topup.data.idtopup)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/transaksi/status", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
console.log(res); // For Debugging
console.log(color("[CHECKING]", "green"), `-> ${sender}`) // For Debugging
if (res.data.status === "success") {
	let persen = (untung / 100) * res.data.price
reply(`*「  TOPUP SUKSES  」*\n*⌬ Status:* Suksess\n*⌬ ID Order:* ${res.data.reff_id}\n*⌬ Layanan:* ${res.data.layanan}\n*⌬ Nomor Tujuan:* ${res.data.target}\n*⌬ Price:* Rp${toRupiah(Number(res.data.price) + Number(Math.ceil(persen)))}\n\n*⌬ SN:*\n${res.data.sn}\n\n_Terimakasih kak sudah order.️_`)
minSaldo(sender, (Number(res.data.price) + Number(Math.ceil(persen))), db_saldo)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (res.data.status === 'failed') {
console.log(res)
reply(`❌Pesanan dibatalkan!\nAlasan : ${res.data.message}`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (res.data.status === 'cansel') {
console.log(res)
reply(`❌Pesanan dibatalkan!\nAlasan : ${res.data.message}`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} 
})
}, 3000)
}

// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

// Casenya
switch(command) {
	case 'help':
	case 'menu':{
		const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator by - ${global.ownerName}`
let simbol = `${pickRandom(["⭔","⌬","〆","»"])}`
var ramex = `./SCRIPT BY YUDAMODS`
	let menu = `━━━━━[ *${global.botName.toUpperCase()}}* ]━━━━━


━━━━━『 𝘿𝘼𝙏𝘼 𝘽𝙊𝙏 』━━━━━

${simbol}ᴄʀᴇᴀᴛᴏʀ : @${global.kontakOwner}
${simbol}ʙᴏᴛ ɴᴀᴍᴇ : ${global.botName}
${simbol}ᴏᴡɴᴇʀ ɴᴀᴍᴇ : ${global.ownerName} 

━━━━━━━━━━━━━━━━━━


━━━━━『 𝗠𝗘𝗡𝗨 1 』━━━━━
${simbol} #topup 
${simbol} #cekharga
${simbol} #saldo (Saldo User)
${simbol} #deposit
${simbol} #depo 
${simbol} #bukti (bukti deposit)
${simbol} #addsaldo (+ saldo user)
${simbol} #minsaldo (- saldo user)
${simbol} #cekip (ip provider)
${simbol} #ceksaldo (saldo di website)
${simbol} #getprofil (cek profil)
${simbol} #setprofit (Set Keuntungan)


${simbol} #menu2 
━━━━━━━━━━━━━━━━━━◧`
yudamods.sendMessage(from, {
text: menu},
 {quoted: fkontak})
}
break
case 'menu2':{
	let menu = `
┏━━━━『 𝙈𝙖𝙞𝙣 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .deposit
┣» .bukti
┣» .produk
┣» .listproduk
┣» .donasi
┣» .ping
┣» .test
┣» .pembayaran 
┣» .bayar
┣» .script
┣» .s
┣» .sticker 
┗━━━━━━━━━━━━━━━━━━◧


┏━━━━『 𝙂𝙧𝙤𝙪𝙥 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .hidetag
┣» .welcome (on/off)
┣» .group open
┣» .group close 
┣» .antilink (kick)
┣» .antilink2 (no kick)
┣» .kick 
┣» .proses
┣» .done
┣» .linkgc
┣» .tagall
┣» .fitnah
┣» .revoke
┣» .delete
┃
┣» .addlist (Support image)
┣» .dellist
┣» .list 
┣» .shop
┣» .hapuslist
┗━━━━━━━━━━━━━━━━━━◧

┏━━━━『 𝙊𝙬𝙣𝙚𝙧 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .ceksaldo
┣» .getprofil
┣» .addsaldo
┣» .minsaldo
┣» .addtesti
┣» .deltesti
┣» .addproduk
┣» .delproduk
┣» .join
┣» .sendbyr 62xxx
┣» .block 62xxx 
┣» .unblock 62xxx
┗━━━━━━━━━━━━━━━━━━◧

┏━━━━『 Kalkulator 』━━━━◧
┃
┣» .tambah
┣» .kali
┣» .bagi
┣» .kurang 
┗━━━━━━━━━━━━━━━━━━◧


┏━━━『 SOSIAL MEDIA 』━━━◧
┃
┣» .ig
┣» .yt
┣» .gc
┣» .youtube
┣» .Instagram 
┣» .groupadmin
┗━━━━━━━━━━━━━━━━━━◧`
yudamods.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'sticker': case 's': case 'stiker':{
if (isImage || isQuotedImage) {
let media = await downloadAndSaveMediaMessage('image', `./gambar/${tanggal}.jpg`)
reply(mess.wait)
yudamods.sendImageAsSticker(from, media, msg, { packname: `${global.namaStore}`, author: `Store Bot`})
} else if (isVideo || isQuotedVideo) {
let media = await downloadAndSaveMediaMessage('video', `./sticker/${tanggal}.mp4`)
reply(mess.wait)
yudamods.sendVideoAsSticker(from, media, msg, { packname: `${global.namaStore}`, author: `Store Bot`})
} else {
reply(`Kirim/reply gambar/vidio dengan caption *${prefix+command}*`)
}
}
break
case 'owner':{
var owner_Nya = `${global.ownerNumber}`
sendContact(from, owner_Nya, `${global.ownerName}`, msg)
reply('*Itu kak nomor owner ku, Chat aja gk usah malu😆*')
}
break
case 'yt':
case 'youtube':
	yudamods.sendMessage(from, 
{text: `Jangan Lupa Subscriber yah kak😉🙏
*Link* : ${global.linkyt}`},
{quoted: msg})
break
case 'ig':
case 'instagram':
	yudamods.sendMessage(from, {text: `Admin Kurang ngurus ig uyy Jadi subscribe aja YouTube admin\n\nLink \n${global.linkig}`},
{quoted: msg})
break
case 'gc':
case 'groupadmin':
	yudamods.sendMessage(from, 
{text: `*Group  ${global.ownerName}*\n
Group1 : ${global.linkgc1}
Group2 : ${global.linkgc2}`},
{quoted: msg})
break
case 'donasi': case 'donate':{
let tekssss = `───「  *DONASI*  」────

*Payment donasi💰* 

- *Dana :* ${global.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Saweria :* ${global.sawer}
- *Qris :* Scan qr di atas

berapapun donasi dari kalian itu sangat berarti bagi kami 
`
yudamods.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
}
break
case 'sendbyr':{
	if (!isOwner) return reply(mess.OnlyOwner)
	if (!q) return reply('*Contoh:*\n.add 628xxx')
	var number = q.replace(/[^0-9]/gi, '')+'@s.whatsapp.net'
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* ${global.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Qris :* Scan qr di atas

_Pembayaran ini Telah di kirim oleh Admin_
_Melalui bot ini🙏_


OK, thanks udah order di *${global.namaStore}*
`
yudamods.sendMessage(number, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
reply (`Suksess Owner ku tercinta 😘🙏`)
}
break
case 'join':{
 if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} _linkgrup_`)
var ini_urrrl = q.split('https://chat.whatsapp.com/')[1]
var data = await yudamods.groupAcceptInvite(ini_urrrl).then((res) => reply(`Berhasil Join ke grup...`)).catch((err) => reply(`Eror.. Munkin bot telah di kick Dari grup tersebut`))
}
break
case 'payment':
case 'pembayaran':
case 'bayar':{
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* ${global.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Qris :* Scan qr di atas

OK, thanks udah order di *${global.botName}*
`
yudamods.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
}
break
case 'proses':{
let tek = (`「 *TRANSAKSI PENDING* 」\n\n\`\`\`🎀 PRODUK : ${q}\n📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n*--------------------------*\n\n*Pesanan ini akan diproses manual oleh admin,* *Tunggu admin memprosesnya??*\n*Atau Chat : Wa.me//${global.kontakOwner}*`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE SAYA TUNGGU👍' }, type: 1 },
]
yudamods.sendMessage(from,
{text: tek})
yudamods.sendMessage(`${global.ownerNumber}`, {text: `*👋HALLO OWNER KU, ADA YANG ORDER PRODUK ${q} NIH*\n\n*DARI* : ${sender.split('@')[0]}`})
}
break
case 'done':{
let tek = (`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih Telah order di *${global.namaStore}*\nNext Order ya🙏`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE THENKS👍' }, type: 1 },
]
yudamods.sendMessage(from,
{text: tek})
}
break
case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
yudamods.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?\nContoh #tagall hallo`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
yudamods.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'fitnah':
if (!isGroup) return reply(mess.OnlyGrup)
if (!q) return reply(`Kirim perintah #*${command}* @tag|pesantarget|pesanbot`)
var org = q.split("|")[0]
var target = q.split("|")[1]
var bot = q.split("|")[2]
if (!org.startsWith('@')) return reply('Tag orangnya')
if (!target) return reply(`Masukkan pesan target!`)
if (!bot) return reply(`Masukkan pesan bot!`)
var mens = parseMention(target)
var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
yudamods.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
break
case 'del':
case 'delete':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
yudamods.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await yudamods.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await yudamods.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'antilink2':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink2) return reply('Antilink 2 sudah aktif')
antilink2.push(from)
fs.writeFileSync('./database/antilink2.json', JSON.stringify(antilink2, null, 2))
reply('Successfully Activate Antilink 2 In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink2) return reply('Antilink 2 belum aktif')
let anu = antilink2.indexOf(from)
antilink2.splice(anu, 1)
fs.writeFileSync('./database/antilink2.json', JSON.stringify(antilink2, null, 2))
reply('Successfully Disabling Antilink 2 In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'group':
case 'grup':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
yudamods.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
yudamods.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
yudamods.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else if (isQuotedMsg) {
number = quotedMsg.sender
yudamods.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
}
break
case 'welcome':{
if (!isGroup) return reply('Khusus Group!') 
if (!msg.key.fromMe && !isOwner && !isGroupAdmins) return reply("Mau ngapain?, Fitur ini khusus admin")
if (!args[0]) return reply('*Kirim Format*\n\n.welcome on\n.welcome off')
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isWelcome) return reply('Sudah aktif✓')
welcome.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('Suksess mengaktifkan welcome di group:\n'+groupName)
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
var posi = welcome.indexOf(from)
welcome.splice(posi, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('Success menonaktifkan welcome di group:\n'+groupName)
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'block':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Block\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block") // Block user
reply('Sukses Block Nomor')
}
break
case 'unblock':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Unblock\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock")
reply('Sukses Unblock Nomor')
}
break
case 'shop':
case 'list':
  if (!isGroup) {
    return reply(mess.OnlyGrup);
  }
  if (db_respon_list.length === 0) {
    return reply(`Belum ada list message di database`);
  }
  if (!isAlreadyResponListGroup(from, db_respon_list)) {
    return reply(`Belum ada list message yang terdaftar di group ini`);
  }
  var arr_rows = [];
  for (let x of db_respon_list) {
    if (x.id === from) {
      arr_rows.push({
        title: x.key,
        rowId: x.key
      });
    }
  }
  let tekny = `Hai @${sender.split("@")[0]}\nBerikut list item yang tersedia di group ini!\n\nSilahkan ketik nama produk yang diinginkan!\n\n`;
  for (let i of arr_rows) {
    tekny += `Produk : ${i.title}\n\n`;
  }
  var listMsg = {
    text: tekny,
  };
  yudamods.sendMessage(from, listMsg);
  break;
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa\n\nAtau kalian bisa Reply/Kasih Image dengan caption: #${command} tes@apa`)
if (isImage || isQuotedImage) {
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender.split('@')[0]}.jpg`)
let url = await TelegraPh(media)
addResponList(from, args1, args2, true, url, db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
if (fs.existsSync(media)) return fs.unlinkSync(media)
} else {
	if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
	addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
}
break
case 'dellist':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: `#hapuslist ${x.key}`
})
}
}
let tekny = `Hai @${sender.split("@")[0]}\nSilahkan Hapus list dengan Mengetik #hapuslist Nama list\n\nContoh: #hapuslist Tes\n\n`;
  for (let i of arr_rows) {
    tekny += `List : ${i.title}\n\n`;
  }
var listMsg = {
    text: tekny,
  };
yudamods.sendMessage(from, listMsg)
}
break
case 'hapuslist':
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'testi':{
if (isGroup) return reply(mess.OnlyPM)
if (db_respon_testi.length === 0) return reply(`Belum ada list testi di database`)
var teks = `Hi @${sender.split("@")[0]}\nBerikut list testi\n\n`
for (let x of db_respon_testi) {
teks += `*LIST TESTI:* ${x.key}\n\n`
}
teks += `_Ingin melihat listnya?_\n_Ketik List Testi yang ada di atss_`
var listMsg = {
text: teks,
mentions: [sender]
}
yudamods.sendMessage(from, listMsg, { quoted: msg })
}
break
case 'addtesti':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (isImage || isQuotedImage) {
if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} testi1@testimoni sc bot`)
if (isAlreadyResponTesti(args1, db_respon_testi)) return reply(`List respon dengan key : *${args1}* sudah ada.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
let tphurl = await TelegraPh(media)
addResponTesti(args1, args2, true, tphurl, db_respon_testi)
reply(`Berhasil menambah List testi *${args1}*`)
if (fs.existsSync(media)) return fs.unlinkSync(media)
} else {
	reply(`Kirim gambar dengan caption ${prefix+command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix+command} *key@response*`)
	}
break
case 'deltesti':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
if (db_respon_testi.length === 0) return reply(`Belum ada list testi di database`)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} testi1`)
if (!isAlreadyResponTesti(q, db_respon_testi)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
delResponTesti(q, db_respon_testi)
reply(`Sukses delete list testi dengan key *${q}*`)
break
case 'listproduk': case 'produk':{
if (isGroup) return reply(mess.OnlyPM)
if (db_respon_produk.length === 0) return reply(`Belum ada list produk di database`)
var teks = `Hi @${sender.split("@")[0]}\nBerikut list produk\n\n`
for (let x of db_respon_produk) {
teks += `*LIST PRODUK:* ${x.key}\n\n`
}
teks += `_Ingin melihat listnya?_\n_Ketik List Produk yang ada di atss_`
var listMsg = {
text: teks,
mentions: [sender]
}
yudamods.sendMessage(from, listMsg, { quoted: msg })
}
break
case 'addproduk':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (isImage || isQuotedImage) {
if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} diamond_ml@list mu`)
if (isAlreadyResponProduk(args1, db_respon_produk)) return reply(`List respon dengan key : *${args1}* sudah ada.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
let tphurl = await TelegraPh(media)
addResponProduk(args1, args2, true, tphurl, db_respon_produk)
reply(`Berhasil menambah List Produk *${args1}*`)
if (fs.existsSync(media)) return fs.unlinkSync(media)
} else {
	reply(`Kirim gambar dengan caption ${prefix+command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix+command} *key@response*`)
	}
break
case 'delproduk':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
if (db_respon_produk.length === 0) return reply(`Belum ada list produk di database`)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} diamond_ml`)
if (!isAlreadyResponProduk(q, db_respon_produk)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
delResponProduk(q, db_respon_produk)
reply(`Sukses delete list testi dengan key *${q}*`)
break
case 'deposit': case 'depo':{
yudamods.sendMessage(from, { text: `╭━━━━━━━━━━━━━━━┅•ิ.•ஐ
│ *${ucapanWaktu} 🌻 @${sender.split('@')[0]}*                             
└┬────────────┾•ิ.•┽
┌┤ *PAY QRIS🖼️*
││• SISTEM: Gateway(Otomatis)
││• Silahkan ketik:
││ _payqris_
││ 
││
││*PAY DANA🏦*
││•SISTEM: Manual
││• Silahkan ketik:
││ _paydana_
││
│└────────────┾•ิ.•┽
╰━━━━━━━━━━━━━━━━┅•ิ.•ஐ 

┏━━━━『 𝗣𝗮𝘆𝗺𝗲𝗻𝘁  』━━━━◧
┣» payqris
┣» paydana
┗━━━━━━━━━━━━━━━━━━◧`, mentions: [sender] })
}
break
case 'bukti':
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) return reply(`Maaf *@${sender.split('@')[0]}* sepertinya kamu belum pernah melakukan deposit`)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#bukti* atau reply gambar yang sudah dikirim dengan caption *#bukti*`)
await yudamods.downloadAndSaveMediaMessage(msg, "image", `./database/deposit/${sender.split('@')[0]}.jpg`)

let oke_bang = fs.readFileSync(`./database/deposit/${sender.split('@')[0]}.jpg`)
let data_depo = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))

let caption_bukti =`「 *DEPOSIT USER* 」
⭔ID: ${data_depo.ID}
⭔Nomer: @${data_depo.number.split('@')[0]}
⭔Payment: ${data_depo.payment}
⭔Tanggal: ${data_depo.date.split(' ')[0]}
⭔Jumlah Deposit: Rp${toRupiah(data_depo.data.amount_deposit)}
⭔Pajak Admin : Rp0
⭔Total Pembayaran : Rp${toRupiah(data_depo.data.amount_deposit)}

Ada yang deposit nih kak, coba dicek saldonya, jika sudah masuk konfirmasi

Jika sudah masuk konfirmasi dengan cara klik *#accdepo*
Jika belum masuk batalkan dengan cara ketik *#rejectdepo*`

let bukti_bayar = {
image: oke_bang,
caption: caption_bukti,
mentions: [data_depo.number],
title: 'Bukti pembayaran',
footer: 'Press The Button Below',
headerType: 5 
}
yudamods.sendMessage(`${global.ownerNumber}`, bukti_bayar)
reply(`Mohon tunggu ya kak, sampai di Konfirmasi oleh owner ☺`)
fs.unlinkSync(`./database/deposit/${sender.split('@')[0]}.jpg`)
break
case 'accdepo':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh: ${prefix+command} 628xxx`)
let orang = q.split(",")[0].replace(/[^0-9]/g, '')
let data_deposit = JSON.parse(fs.readFileSync(depositPath + orang + '.json'))
addSaldo(data_deposit.number, Number(data_deposit.data.amount_deposit), db_saldo)
var text_sukses = `「 *DEPOSIT SUKSES* 」
⭔ID : ${data_deposit.ID}
⭔Nomer: @${data_deposit.number.split('@')[0]}
⭔Nomer: ${data_deposit.number.split('@')[0]}
⭔Payment: ${data_deposit.payment}
⭔Tanggal: ${data_deposit.date.split(' ')[0]}
⭔Jumlah Deposit: Rp${toRupiah(data_deposit.data.amount_deposit)}`
reply(`${text_sukses}\n`)
yudamods.sendMessage(data_deposit.number, { text: `${text_sukses}\n\n_Deposit kamu telah dikonfirmasi oleh admin, silahkan cek saldo dengan cara ketik #saldo_`})
fs.unlinkSync(depositPath + data_deposit.number.split('@')[0] + ".json")
}
break
case 'rejectdepo':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh: ${prefix+command} 628xxx`)
let orang = q.split(",")[0].replace(/[^0-9]/g, '')
let data_deposit = JSON.parse(fs.readFileSync(depositPath + orang + '.json'))
reply(`Sukses Reject  Deposit `)
yudamods.sendMessage(data_deposit.number, { text: `Maaf Deposit Dengan ID : *${data_deposit.ID}* Ditolak, Jika ada kendala hubungin Owner Bot.\nwa.me/${global.ownerNumber}`})
fs.unlinkSync(depositPath + data_deposit.number.split('@')[0] + ".json")
}
break

case 'saldo':{
reply(`*━━ CHECK YOUR INFO ━━* 

 _• *Name:* ${pushname}_
 _• *Nomer:* ${sender.split('@')[0]}_
 _• *Saldo:* Rp${toRupiah(cekSaldo(sender, db_saldo))}_

*Note :*
_Saldo hanya bisa untuk topup_
_Tidak bisa ditarik atau transfer_!`)
}
break
case 'addsaldo':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 6283153305709|20000`)
if (!q.split("|")[0]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 6283153305709|20000`)
if (!q.split("|")[1]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 6283153305709|20000`)
addSaldo(q.split("|")[0]+"@s.whatsapp.net", Number(q.split("|")[1]), db_saldo)
await sleep(50)
yudamods.sendTextMentions(from, `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split("|")[0]+"@s.whatsapp.net"])
yudamods.sendTextMentions(q.split("|")[0]+"@s.whatsapp.net", `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split("|")[0]+"@s.whatsapp.net"])
break
case 'minsaldo':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 6283153305709|20000`)
if (!q.split("|")[0]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 6283153305709|20000`)
if (!q.split("|")[1]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 6283153305709|20000`)
if (cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo) == 0) return reply("Dia belum terdaftar di database saldo.")
if (cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo) < q.split("|")[1] && cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo) !== 0) return reply(`Dia saldonya ${cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo)}, jadi jangan melebihi ${cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo)} yah kak??`)
minSaldo(q.split("|")[0]+"@s.whatsapp.net", Number(q.split("|")[1]), db_saldo)
await sleep(50)
yudamods.sendTextMentions(from, `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split("|")[0]+"@s.whatsapp.net"])
break
case 'topup':{
if (cekSaldo(sender, db_saldo) < 1) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan topup.`)
if (!q) return reply(`Ex: ${prefix+command} kodeproduk,no/id\n\nContoh: ${prefix+command} ML1000,123456781234\n\nUntuk mendapatkan kode produk ketik *${prefix}cekharga*\n\n_NOTE: UNTUK TOPUP DIAMOND ML ID DENGAN ZONE DIGABUNG, JANGAN DIKASIH SPASI MAUPUN TANDA KURUNG Contoh: 1846795042936_`)
if (!q.split(",")[1]) return reply(`Ex: ${prefix+command} kodeproduk,no/id\n\nContoh: ${prefix+command} ML1000,12345678(1234)\n\nNote: Harap pastikan nomornya benar\n\nUntuk mendapatkan kode produk ketik *${prefix}cekharga*`)
if (!fs.existsSync(topupPath + sender.split("@")[0] + ".json")) {
let cekhar = new URLSearchParams()
cekhar.append("api_key", apikeyAtlantic)
cekhar.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: cekhar,
redirect: 'follow'
})
.then(responsee => responsee.json())
.then(ress => {
let listproduk
for (let x of ress.data) {
if (x.code == q.split(",")[0]) {
listproduk = x ? x : false
}
}
if (!listproduk) return reply(`_Code produk *${q.split(",")[0]}* Tidak sesuai_`)
let kntungan = (untung / 100) * listproduk.price.replace(/[^0-9]/g, '')
if (cekSaldo(sender, db_saldo) < Number(listproduk.price.replace(/[^0-9]/g, '')) + Number(Math.ceil(kntungan))) return reply(`Maaf *${pushname},*\n🍁saldo anda kurang dari Rp${toRupiah(Number(listproduk.price.replace(/[^0-9]/g, '')) + Number(Math.ceil(kntungan)))}, Silahkan Ketik #deposit Untuk melakukan deposit`)
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("code", q.split(",")[0])
key.append("reff_id", require("crypto").randomBytes(5).toString("hex").toUpperCase())
key.append("target", q.split(",")[1])
fetch("https://atlantich2h.com/transaksi/create", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) return reply('Server maintenance.')
let persen = (untung / 100) * res.data.price
var object_buy = {
number: sender,
result: res.status,
data: {
idtopup: res.data.id,
id: res.data.reff_id,
price: res.data.price + Number(Math.ceil(persen)),
layanan: res.data.layanan
}
}
fs.writeFile(topupPath + sender.split("@")[0] + ".json", JSON.stringify(object_buy, null, 3), () => {
reply(`*「 ${res.message.toUpperCase()} 」*\n\n*PESAN:* _Silahkan Cek pesanan anda, Pesanan sudah Masuk? Ketik Sukses Untuk Mengkonfirmasi Pesanan🛜_`)
})
})
})
} else {
reply(`Kamu sedang melakukan topup, mohong tunggu sampai proses topup selesai.`)
}
}
break
case 'cekharga':{
let teks = `*BERIKUT LIST HARGA YANG TERSEDIA📝*

_Silahkan Pilih layanan yang tersedia
dengan mengetik Arahan dibawah ini_

━[ *VOUCHER GAME🎮* ]━
KETIK *ml* LIST HARGA TOPUP ML
KETIK *ff* LIST HARGA TOPUP FF
KETIK *pubg* LIST HARGA TOPUP PUBG

━[ *TOKEN LISTRIK💡* ]━
KETIK *pln* LIST HARGA TOKEN PLN

━[ *TOPUP SALDO🏧* ]━
KETIK *dana* LIST HARGA SALDO DANA
KETIK *gopay* LIST HARGA SALDO GOPAY
KETIK *ovo* LIST HARGA SALDO OVO
KETIK *shopeepay* LIST HARGA SALDO SHOPEEPAY
KETIK *linkaja* LIST HARGA SALDO LINKAJA

━[ *KUOTA INTERNET🛜* ]━
KETIK *smartfren* LIST HARGA KUOTA SMARTFREN
KETIK *telkomsel* LIST HARGA KUOTA TELKOMSEL
KETIK *axis* LIST HARGA KUOTA AXIS
KETIK *indosat* LIST HARGA KUOTA INDOSAT
KETIK *three* LIST HARGA KUOTA THREE

━[ *PULSA TRANSFER📱* ]━
KETIK *pul_smartfren* LIST HARGA PULSA SMARTFREN
KETIK *pul_telkomsel* LIST HARGA PULSA TELKOMSEL
KETIK *pul_axis* LIST HARGA PULSA AXIS
KETIK *pul_indosat* LIST HARGA PULSA INDOSAT
KETIK *pul_three* LIST HARGA PULSA THREE`
reply(teks)
}
break
case 'setprofit':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Gunakan dengan kata command: ${prefix+command} 20%\n\n_Text 20% bisa kalian ganti dengan seberapa besar Keuntungan Yg Akan anda Peroleh_`)
if (q.replace(/[^0-9]/g, '') < 1) return reply('Minimal 1%')
if (q.replace(/[^0-9]/g, '') > 99) return reply('Maksimal 99%')
untung = q.replace(/[^0-9]/g, '')
await reply(`Profit Anda telah distel menjadi ${q.replace(/[^0-9]/g, '')}%`)
}
break
case 'ml':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP ML*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "MOBILE LEGENDS" && i.category !== "Membership") {
	let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'ff':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP FF*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "FREE FIRE") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'pubg':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP PUBG*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "PUBG MOBILE" && i.category !== "Voucher") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'pln':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOKEN PLN*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "PLN") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'dana':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO DANA*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "DANA") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'gopay':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO GOPAY*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "GO PAY" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'ovo':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO OVO*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "OVO") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'shopeepay':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO SHOPEEPAY*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "SHOPEE PAY") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'linkaja': {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO LINKAJA*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "LinkAja") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'smartfren':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA KUOTA SMARTFREN*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "SMARTFREN" && i.type !== "Pulsa Transfer" && i.category !== "Pulsa Reguler" && i.type !== "Voucher") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'telkomsel':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA KUOTA TELKOMSEL*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "TELKOMSEL" && i.type !== "Pulsa Transfer" && i.category !== "Pulsa Reguler" && i.type !== "Voucher") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'axis':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA KUOTA AXIS*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "AXIS" && i.type !== "Pulsa Transfer" && i.category !== "Pulsa Reguler" && i.type !== "Voucher") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'indosat':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA KUOTA INDOSAT*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "INDOSAT" && i.type !== "Pulsa Transfer" && i.category !== "Pulsa Reguler" && i.type !== "Voucher") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'three':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA KUOTA THREE*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "TRI" && i.type !== "Pulsa Transfer" && i.category !== "Pulsa Reguler" && i.type !== "Voucher") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'pul_smartfren':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PULSA SMARTFREN*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "SMARTFREN" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'pul_telkomsel':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PULSA TELKOMSEL*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "TELKOMSEL" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'pul_axis':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PULSA AXIS*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "AXIS" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'pul_indosat':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PULSA INDOSAT*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "INDOSAT" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break

case 'pul_three':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
yudamods.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PULSA THREE*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
for (let i of res.data) {
if (i.provider == "THREE" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
teks += `*Kode:* ${i.code}\n*Nama:* ${i.name}\n*Harga:* Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))}\n*Status:* ${i.status == "available" ? "✅" : "❎"}\n\n`
}
}
reply(teks)
}
})
}
break
case 'getprofil':
case 'ceksaldo':{
if (!isOwner) return reply(mess.OnlyOwner)
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
fetch("https://atlantich2h.com/get_profile", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) return reply('Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider')
reply(`*ATLANTIC PEDIA PROFILE*\n*Name:* ${res.data.name}\n*Username:* ${res.data.username}\n*Email:* ${res.data.email}\n*Sisa Saldo:* Rp${toRupiah(res.data.balance)}`)
})
}
break

case 'cekip':{
if (!isOwner) return reply(mess.OnlyOwner)
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
fetch("https://atlantich2h.com/get_profile", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) return reply('Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider')
reply('IP sudah tersambung ke server.')
})
}
break
default:
if ((budy) && ["assalamu'alaikum", "Assalamu'alaikum", "Assalamualaikum", "assalamualaikum", "Assalammualaikum", "assalammualaikum", "Asalamualaikum", "asalamualaikum", "Asalamu'alaikum", " asalamu'alaikum"].includes(budy) && !isCmd) {
yudamods.sendMessage(from, { text: `${pickRandom(["Wa'alaikumussalam","Wa'alaikumussalam Wb.","Wa'alaikumussalam Wr. Wb.","Wa'alaikumussalam Warahmatullahi Wabarakatuh"])}`})
}
if ((budy) && ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(budy) && !isCmd) {
yudamods.sendMessage(from, { text: `${runtime(process.uptime())}*⏰`})
}

}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
yudamods.sendMessage(`${global.ownerNumber}`, {text:errny, mentions:[sender]})
}}