import ProductsModel from '../models/products'
import dbConnect from '../utils/dbconnect'
import formidable from 'formidable-serverless'
const path = require('path')
import fs from 'fs'

const post = async (req, res) => {

    await dbConnect()

    const form = new formidable.IncomingForm({
        multiples: true,
        uploadDir: 'public/uploads',
        keepExtensions: true,
    })

    form.parse(req, (error, fields, data) => {
        if(error){
            return res.status(500).json({ success: false })
        }

        const { files } = data

        const filesToRename = files instanceof Array
        ? files
        : [files]        
        
        filesToRename.forEach(file => {
            const timeStamp = Date.now()
            const random = Math.floor(Math.random() * 999999) + 1            
            
            const extension = path.extname(file.name) //.jpg ou .png
            const fileName = `${timeStamp}_${random}${extension}`

            const oldPath = path.join(__dirname, `../../../../${file.path}`)
            const newPath = path.join(__dirname, `../../../../${form.uploadDir}/${fileName}`)

            fs.rename(oldPath, newPath, (error) => {
                if(error){
                    console.log(error)
                    return res.status(500).json({ success: false })
                }
            })
        })

        res.status(200).json({ success: true })
    }) 

}

export {
    post,
}