import Url from '../models/Url.js';
import { generateShortUrl } from '../utils/generateShortUrl.js';

export const shortenUrl = async (req, res) => {
  try {
    //todo - implement shortenUrl
    const { originalUrl } = req.body;
    const shortUrl = generateShortUrl();
    const newUrl = new Url({ originalUrl, shortUrl });
    await newUrl.save();
    res.status(201).json(newUrl);

  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    //todo - implement getAllUrls
    const urls = await Url.find();
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    //todo - implement redirectUrl
     const { shortUrl } = req.params;
    const foundUrl = await Url.findOne({ shortUrl });
    if (!foundUrl) return res.status(404).json({ error: 'URL not found' });

    foundUrl.clicks++;
    await foundUrl.save();
    res.redirect(foundUrl.originalUrl);
  } catch (error) {
     res.status(500).json({ error: 'Server Error' });
  }
}; 