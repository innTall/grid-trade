import Options from "../models/optionsModel.js";
const getOptions = async (req, res) => {
  try {
    const options = await Options.find({});
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOptions = async (req, res) => {
  try {
    const options = await Options.create(req.body);
    res.status(200).json(options);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateOptions = async (req, res) => {
  try {
    const options = await Options.updateMany(req.body);
    res.status(200).json(options);
    //const newOptions = await _option.save();
    //res.send(newOptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOptions = async (req, res) => {
  try {
    const options = await Options.deleteMany();
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export { createOptions, getOptions, updateOptions, deleteOptions };
