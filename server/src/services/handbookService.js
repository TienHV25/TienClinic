import db from '../models/index.js';

let createHandbookTest = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.title || !data.questions || !data.evaluationName || !Array.isArray(data.questions)) {
                resolve({
                    errCode: 1,
                    message: "Missing input parameter"
                });
            } else {
                
                let newTest = await db.HandbookTest.create({
                    title: data.title,
                    evaluationName: data.evaluationName 
                });

                
                for (let q of data.questions) {
                    let question = await db.HandbookQuestion.create({
                        testId: newTest.id,
                        questionText: q.questionText
                    });

                    
                    for (let opt of q.options) {
                        await db.HandbookOption.create({
                            questionId: question.id,
                            optionText: opt.optionText,
                            score: opt.score || 0
                        });
                    }
                }

                resolve({
                    errCode: 0,
                    message: "Create handbook test success!"
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let getAllHandbookTests = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let tests = await db.HandbookTest.findAll();
            resolve({
                errCode: 0,
                data: tests
            });
        } catch (error) {
            reject(error);
        }
    });
}

let getHandbookTestDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let test = await db.HandbookTest.findOne({
                where: { id },
                raw: true
            });

            if (!test) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Test not found'
                });
            }

            
            let questions = await db.HandbookQuestion.findAll({
                where: { testId: id },
                raw: true
            });

            
            let questionIds = questions.map(q => q.id);
            let options = await db.HandbookOption.findAll({
                where: { questionId: questionIds },
                raw: true
            });

            
            let questionsWithOptions = questions.map(q => {
                return {
                    ...q,
                    options: options.filter(o => o.questionId === q.id)
                };
            });

            
            resolve({
                errCode: 0,
                data: {
                    ...test,
                    questions: questionsWithOptions
                }
            });

        } catch (error) {
            reject(error);
        }
    });
};

let createHandbook = (data) => {
    return new Promise(async (resolve,reject) => {
        try {
            console.log(data)
            if(!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown || !data.testId){
                resolve({
                errCode : 1,
                message : "Misisng input parameter"
             })
            }else{
               await db.Handbook.create({
                    name: data.name,
                    image: data.image,
                    descriptionHTML:data.descriptionHTML,
                    descriptionMarkdown:data.descriptionMarkdown,
                    testId: data.testId,
               })
                resolve({
                    errCode : 0,
                    message : "Create handbook succedd !"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllHandbook = (limit) => {
    return new Promise(async (resolve,reject) => {
        try {
        let data = await db.Handbook.findAll({limit:limit})
        if(data && data.length > 0){
           data = data.map(item => {item.image = Buffer.from(item.image,'base64').toString('binary')
           return item
           })
        }
        resolve({
            errCode : 0,
            message : "Create handbook succedd !",
            data: data 
        })
        } catch (error) {
            reject(error);
        }
    })
}

let getHandbookDetail = (id) => {
    return new Promise(async (resolve,reject) => {
        try {
        if(!id){
            resolve({
            errCode : 1,
            message : "Misisng input parameter !",
        })
        }else{
            let data = await db.Handbook.findOne({
            where:{
                id: id
            }
           })
            if(data && data.length > 0){
                data = data.map(item => {item.image = Buffer.from(item.image,'base64').toString('binary')
                return item
                })
            }
            resolve({
            errCode : 0,
            message : "Create specialty succedd !",
            data: data 
        })
        }
        } catch (error) {
            reject(error);
        }
    })
}

export default {
    createHandbookTest,
    getAllHandbookTests,
    getHandbookTestDetail,
    createHandbook,
    getAllHandbook,
    getHandbookDetail
}
