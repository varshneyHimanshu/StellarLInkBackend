import { AdData } from "../Ad.js"

export const getAdData = async(req,res)=>{
    const id = req.params.id;
    const data = AdData[id-1];
    res.status(200).json(data);
}
