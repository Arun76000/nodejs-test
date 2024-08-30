const customerModel = require('./customer.model')
const {catchAsync, response, paginate} = require('./utils')


const getAll =catchAsync(async(req, res)=>{
    const {limit, skip} = await paginate(req.query)
    const customer = await customerModel.find().skip(skip).limit(limit);
    response(res, 200, "All Customer Fetched Successfully!", customer)
    return ;
});

const getCustomerByNameOrCity =catchAsync(async(req, res)=>{
    const search = req.query.search || '';    
    const customer = await customerModel.find({
        $or:[
            {lastName:{$regex: search, $options: 'i'}},
            {firstName:{$regex: search, $options: 'i'}},
            {city:{$regex: search, $options: 'i'}},
        ]
    });
    if(!customer){
        response(res, 404 , "Customer Not Found!")
        return ;
    }
    response(res, 200, "Customer Fetched Successfully!", customer)
    return ;
});

const getById =catchAsync(async(req, res)=>{
    const {id} = req.params;
    const customer = await customerModel.findById(id);
    if(!customer){
        response(res, 404 , "Customer Not Found!")
        return ;
    }
    response(res, 200, "Customer Fetched Successfully!", customer)
});

const getAllCityCustomer =catchAsync(async(req, res)=>{
    const customerCity = await customerModel.aggregate([
        {
            $group:{
                _id:"$city",
                totalCustomers:{$sum:1}
            },
        },
        {
            $sort:{totalCustomers: -1}
        }
    ]);
    response(res, 200, "Data Fetched Successfully!", customerCity)
});

const getUsersByCity =catchAsync(async(req, res)=>{
    const {limit, skip} = await paginate(req.query)
    const {city} = req.params;
    const customer = await customerModel.find({city}).skip(skip).limit(limit);
    response(res, 200, "Customer Fetched By City!", customer)
});

const createCustomer =catchAsync(async(req, res)=>{
    const {firstName, lastName, city} = req.body;
    if(!firstName || !lastName || !city){
        response(res, 400, "All Fields Firstname Lastname and City Are Required!")
        return ;
    }
    const newCustomer = new customerModel({
        firstName,
        lastName,
        city
    })
    await newCustomer.save()
    response(res, 201, "Customer Created Successfully", newCustomer)
});

const updateCustomerById =catchAsync(async(req, res)=>{
    const {customerId} =req.params;
    const {firstName, lastName, city} = req.body;
    if(!firstName && !lastName && !city){
        response(res, 400, "Any One Field of these 'Firstname Lastname and City' is Required!")
        return ;
    }
    const customer = await customerModel.findByIdAndUpdate(customerId,req.body,{new:true});
    await customer.save()
    response(res, 200, "Customer Updated Successfully", customer)
    return ;
});

module.exports ={
    getAll,
    getCustomerByNameOrCity,
    getById,
    getAllCityCustomer,
    getUsersByCity,
    createCustomer,
    updateCustomerById
};