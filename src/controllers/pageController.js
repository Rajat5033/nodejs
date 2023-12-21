import envconfig from "../config/envConfig.js";
import { v2 as cloudinary} from 'cloudinary';
import Page from "../models/PageModel.js";

// Configuration
cloudinary.config({
    cloud_name: envconfig.CLOUD_NAME,
    api_key: envconfig.API_KEY,
    api_secret: envconfig.API_SECRET
});


// Post createPage
const createPage = async (req, res) => {
    try {
        const { pageName, title, description, shortDescription, buttonName } = req.body;
        const { path: tempPath, filename } = req.file;
        if (!pageName || !filename || !title || !description || !buttonName || !shortDescription) {
            res.status(400).json({ message: "All fields are required" });
        } else {
            const { secure_url } = await cloudinary.uploader.upload(tempPath);
            const doc = new Page({
                image: secure_url,
                title,
                description,
                shortDescription,
                buttonName,
                pageName
            });
            const pageSave = await doc.save();
            if (pageSave?._id) {
                return res.status(200).json({
                    _id: pageSave._id,
                    image: secure_url,
                    title,
                    description,
                    shortDescription,
                    buttonName,
                    pageName
                });
            } else {
                res.status(400).json({ error: error });
            }
        }
    } catch (error) {
        console.error('Error in create page', error);
        res.status(500).json({ message: 'Error in create page' });
    }
};
const getPages = async(req, res) => {
    try {
        const pageid = req.params.id;
        const findPage = await Page.findById(pageid)
        if(!findPage){
            return res.status(404).json({message: 'page not found'})
        }else{
            return res.status(200).json({message: 'found', findPage})
        }
    } catch (error) {
        console.error('Error in find page', error);
        res.status(500).json({ message: 'Error in find page' });
    }
}
export { createPage, getPages};