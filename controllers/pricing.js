const Price = require('../models/pricing');
exports.addPrice = async(req, res, next) =>
{
    try
    {
    const limitOffer=req.body.limitOffer;
    const durationLimit = req.body.durationLimit;
    const description=req.body.description;
    const prices = req.body.price;
    const package = new Price(
        {
            limitOffer: limitOffer,
            durationLimit: durationLimit,
            description: description,
            price: prices
        }
    );
    const packages = await package.save();
    res.status(200).json({message: "Package Saved", packages});
    }
    catch(error)
    {
        console.error(error);
        next(error);
    }
};
exports.getPrices = async(req, res, next) =>
{
    try
    {
        const Prices = await Price.find();
        res.status(200).json({message: "Prices ", Prices});
    }
    catch(error)
    {
        console.error(error);
        next(error);
    }
};
exports.updatePrice = async (req, res, next) => {
    try {
      const priceId = req.params.priceId;
      const limitOffer = req.body.limitOffer;
      const durationLimit = req.body.durationLimit;
      const description = req.body.description;
      const pric = req.body.price;
  
      const prices = await Price.findById(priceId);
  
      if (!prices) {
        const error = new Error("Package not found");
        error.statusCode = 404;
        throw error;
      }
  
      prices.limitOffer = limitOffer;
      prices.durationLimit = durationLimit;
      prices.description = description;
      prices.price = pric;
  
      const result = await prices.save();
  
      res.status(200).json({ message: "Package updated", result });
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  };
  exports.deletePackage = async(req, res, next) =>
  {
    try
    {
    const priceId = req.params.priceId;
    results = await Price.findByIdAndDelete(priceId);
    res.status(200).json({message: "Delete Package", results});
    }
    catch(error)
    {
        console.error(error);
        next(error);
    }
  };