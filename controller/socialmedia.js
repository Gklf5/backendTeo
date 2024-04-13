import SocialMedia from "../models/SocialMedia"
import User from "../models/User"
import { createError } from "../error"

export const addSociaMedia = async (req,res,next) => {
    try {
        const newSocialMedia = new SocialMedia({creator:req.user.id, ...res.body})
        const savedSocialMedia = await newSocialMedia.save()
        await User.findByIdAndUpdate(req.user.id,{
            $push:{socialMedias:savedSocialMedia.id}
        })
        res.status(200).json(savedSocialMedia)
    } catch (err) {
        next(err)
    }
}


export const removeSocialMedia = async (req,res,next)=>{
    try {
        const socialMedia = await findById(req.params.id)
        if(socialMedia.creator === req.user.id){
            await SocialMedia.findByIdAndDelete(res.params.id)
            res.status(200).json("Successfully deleted socialMedia")
        }
        else{
            createError(401,"You can only delete your own seocialMedia")
        }
    } catch (err) {
        next(err)
    }
}

export const updateSocialMedia = async (req,res,next) =>{
    const socialMedia = await findById(req.params.id)
    if(socialMedia.creator === req.user.id){
        const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(req.params.id,{...req.body})
        res.status(200).json(updatedSocialMedia)
    }
    else{
        createError(401,"You can only update your own seocialMedia")
    }
}