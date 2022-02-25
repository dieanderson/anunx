import ProductsModel from '../models/products'
import dbConnect from '../utils/dbconnect'
import formidable from 'formidable-serverless'
const path = require('path')
const fs = require('fs')

const post = async (req, res) => {

    await dbConnect()

    const form = new formidable.IncomingForm({
        multiples: true,
        uploadDir: 'public/uploads',
        keepExtensions: true,
    })

    form.parse(req, async (error, fields, data) => {
        if(error){
            return res.status(500).json({ success: false })
        }

        const { files } = data

        const filesToRename = files instanceof Array
        ? files
        : [files]  
        
        const filesToSave = []
        
        filesToRename.forEach(file => {
            const timeStamp = Date.now()
            const random = Math.floor(Math.random() * 99999999) + 1            
            
            const extension = path.extname(file.name) //.jpg ou .png
            const fileName = `${timeStamp}_${random}${extension}`

            const oldPath = path.join(__dirname, `../../../../../${file.path}`)
            const newPath = path.join(__dirname, `../../../../../${form.uploadDir}/${fileName}`)
            
            filesToSave.push({
                name: fileName,
                path: newPath,
            })
            fs.rename(oldPath, newPath, (error) => {
                if(error){
                    console.log(error)
                    return res.status(500).json({ success: false })
                }
            })
        })

        const {
            title,
            category,
            description,
            price,
            name,
            email,
            phone,
            userId,
            image,
            uf,
            city,
        } = fields

        const product = new ProductsModel({
            title,
            category,
            description,
            price,
            user: {
                id: userId,
                name,
                email,
                phone,
                image,
                uf,
                city,
            },
            files: filesToSave,    
        })

        const register = await product.save()

        if (register) {
            res.status(201).json({ success: true })
        }else {
            res.status(500).json({ success: false })
        }

    }) 

}

const remove = async (req, res) => {

    await dbConnect()
    
    const id = req.body.id
    
    const deleted = await ProductsModel.findOneAndRemove({ _id: id })

    if (deleted) {
        return res.status(200).json({ success: true })
    } else {
        return res.status(500).json({ success: false })    
    }
}

export {
    post,
    remove,
}