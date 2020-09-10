const router = require('express').Router();
const cheerio = require('cheerio');
const AxiosService = require('../axiosService')
const url = 'https://covid19.karawangkab.go.id/'
//sebuah filter yang mengambil sebuah angka saja dan dijadikan sebuah array
const regex = /(\d+)/g
//ini opsional saja


router.get('/', async (req, res) => {
    const response = await AxiosService(url)
    const $ = cheerio.load(response.data)
    //mendapatkan data konfirmasi
    let konfirmasi = {};
    konfirmasi.total = $('div.col-md-12').find('p.box_positif_R').text().trim()//.match(regex)[0]
    konfirmasi.isolasi_mandiri = $('div.col:nth-of-type(1)').find('p.box_positif_R').text().trim()//.match(regex)[0]
    konfirmasi.sembuh = $('div.col:nth-of-type(2)').find('p.box_positif_R').text().trim()//.match(regex)[0]
    let obj_konfirmasi = { konfirmasi };

    //mendapatkan data
    let suspek = {};
    suspek.total = $('div.col-md-12').find('p.box_pdp').text().trim()//.match(regex)[0]
    suspek.isolasi_mandiri = $('div.col:nth-of-type(1)').find('p.box_pdp').text().trim()//.match(regex)[0]
    suspek.dalam_perawatan = $('div.col:nth-of-type(2)').find('p.box_pdp').text().trim()//.match(regex)[0]
    suspek.discarded = $('div:nth-of-type(3)').find('p.box_pdp').text().trim()//.match(regex)[0]


    let probabel = {};
    probabel.total = $('div.col-md-12').find('p.box_odp').text().trim()//.match(regex)[0]
    probabel.dalam_perawatan = $('div.col:nth-of-type(1)').find('p.box_odp').text().trim()//.match(regex)[0]
    probabel.selesai_isolasi = $('div.col:nth-of-type(2)').find('p.box_odp').text().trim()//.match(regex)[0]
    probabel.meninggal = $('div.col:nth-of-type(3)').find('p.box_odp').text().trim()//.match(regex)[0]


    let kontak_erat = {};
    kontak_erat.total = $('div.col-md-12').find('p.box_otg').text().trim()//.match(regex)[0]
    kontak_erat.karantina_mandiri = $('div.col:nth-of-type(1)').find('p.box_otg').text().trim()//.match(regex)[0]
    kontak_erat.discarded = $('div.col:nth-of-type(2)').find('p.box_otg').text().trim()//.match(regex)[0]



    res.json({ konfirmasi, suspek, probabel, kontak_erat });
})



module.exports = router;