import Favorit from "../models/favoritModel.js";
const getFavorit = async (req, res) => {
  try {
    const favorits = await Favorit.find(req.body);
    res.status(200).json(favorits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createFavorit = async (req, res) => {
  try {
    const favorit = await Favorit.create(req.body);
    res.status(200).json(favorit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFavorit = async (req, res) => {
  try {
    const favorit = await Favorit.updateMany(req.body); // we cannot find any Options in DB
    res.status(200).json(favorit);
    //const newSelect = await favorit.save();
    //res.send(newSelect);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
		const favorit = await Favorit.findByIdAndDelete(req.params.id);
		res.status(200).json(`Ticker with ${favorit.symbol} has been deleted..`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAll = async (req, res) => {
  try {
    const favorits = await Favorit.deleteMany();
    res.status(200).json(favorits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { createFavorit, getFavorit, updateFavorit, deleteItem, deleteAll };
