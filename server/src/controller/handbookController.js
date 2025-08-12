import handbookService from "../services/handbookService.js";

let createHandbookTest = async (req, res) => {
    try {
        let data = await handbookService.createHandbookTest(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        });
    }
}

let getAllHandbookTests = async (req, res) => {
    try {
        let data = await handbookService.getAllHandbookTests();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        });
    }
}

let getHandbookTestDetail = async (req, res) => {
    try {
        let data = await handbookService.getHandbookTestDetail(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        });
    }
}

let createHandbook = async (req,res) => {
     try {
        let infors = await handbookService.createHandbook(req.body);
        return res.status(200).json(infors);
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
     }
}

let getAllHandbook = async (req,res) => {
    let limit = +req.query.limit;
    if(!limit) limit = 10;
     try {
        let infors = await handbookService.getAllHandbook(limit);
        return res.status(200).json(infors);
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
     }
}

let getHandbookDetail = async(req,res) => {
   try {
      let infors = await handbookService.getHandbookDetail(req.query.id);
      return res.status(200).json(infors);
   } catch (error) {
      console.log(error)
      return res.status(500).json({
         errCode: -1,
         message: "Error from server"
      })
   }
}

export default {
    createHandbookTest,
    getAllHandbookTests,
    getHandbookTestDetail,
    createHandbook,
    getAllHandbook,
    getHandbookDetail
}
