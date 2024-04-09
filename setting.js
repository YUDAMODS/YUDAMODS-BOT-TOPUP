const chalk = require("chalk")
const fs = require("fs")

const payment = {
    qris: {
      link_nya: "https://telegra.ph/file/1f826ff9868afdf744ce1.jpg",
      atas_nama: "RAMA STORE"
    },
    dana: {
      nomer: "083842204546",
      atas_nama: "Y****Z"
    },
    ovo: {
      nomer: "083842204546", //Ovo Nonaktif 
      atas_nama: "YUDAMODS" 
    }
}

const apikeyAtlantic = "QTErZSurBVsHh2JUdiXkZC3Pl2TZ0l0fREMsggEz2eP9iB0YhG9PjgVC4QXdu9o0rFI6LCXFZWhib9QiV5FOoij8DMbVgQpx92ZM"
//AKUN H2H 
//https://atlantich2h.com (DISINI KALIAN BISA BUAT PROVIDER NYA)

//BUAT AKUN DISINI DULU
//https://m.atlantic-pedia.co.id/

  global.ownerNumber = "6283153305709@s.whatsapp.net"
  global.kontakOwner = "6283153305709"
  global.untung = "1"
  //Ini profit yg kamu dapat, 1 = 1% maka harga akan meningkat 1%
  //Isi sesuai kebutuhan 
  global.namaStore = "YudaMods Store"
  global.botName = "YudaMods Store Bot"
  global.ownerName = "YudaMods"
  
  
  global.linkyt = "https://youtube.com/@YUDAMODS"
  global.linkig = "https://instagram/yudamods"
  global.dana = "Scan qris di atas"
  global.sawer = "Scan qris di atas"


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})

module.exports = { payment, apikeyAtlantic }