const Advertisement = require("../models/news");
const { nanoid } = require("nanoid");
const fs = require("fs");

const server_url = process.env.SERVER_URL || "http://localhost:3000/uploads/";

exports.createAdvertisement = async (req, res) => {
    try {
        if (req.files) {
            const { image } = req.files;
            var processedImage = "";
            console.log("worked");
            if (image) {
                console.log("worked here too");
                const filename = nanoid() + ".jpg";
                await image.mv(`./public/uploads/${filename}`, async (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ success: false, error: err.message });
                    } else {
                        processedImage = server_url + filename;

                        const advertisement = await Advertisement.create({
                            image: processedImage,
                            link: req.body.link,
                            title: req.body.title,
                            description: req.body.description,
                            type: "advertisement"
                        });

                        res.status(201).json({
                            success: true,
                            message: "Advertisement created successfully",
                            data: advertisement
                        });
                    }
                });
            } else {
                const advertisement = await Advertisement.create({
                    link: req.body.link,
                    title: req.body.title,
                    description: req.body.description,
                    type: "advertisement"
                });

                res.status(201).json({
                    success: true,
                    message: "Advertisement created successfully",
                    data: advertisement
                });
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}

exports.getAllAdvertisements = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const offset = (page - 1) * limit;
        const advertisements = await Advertisement.findAll({
            limit: limit,
            offset: offset,
            where: {
                type: "advertisement"
            }
        });

        res.status(200).json({
            success: true,
            message: "Advertisements fetched successfully",
            data: advertisements
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}

exports.getAdvertisementById = async (req, res) => {
    try {
        const advertisement = await Advertisement.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!advertisement) {
            res.status(400).json({
                success: false,
                message: "Advertisement not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Advertisement fetched successfully",
            data: advertisement
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}

exports.updateAdvertisement = async (req, res) => {
    try {
        const advertisement = await Advertisement.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!advertisement) {
            res.status(400).json({
                success: false,
                message: "Advertisement not found"
            });
            return;
        }

        if (req.files) {
            const { image } = req.files;
            var processedImage = "";

            if (image) {
                const filename = nanoid() + ".jpg";
                image.mv(`./public/uploads/${filename}`, async (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ success: false, error: err.message });
                    } else {
                        const strippedFilename = advertisement.image.replace(server_url, "");
                        await fs.unlink(`./public/uploads/${strippedFilename}`, async (err) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json({ success: false, error: err.message });
                            }
                        });
                        processedImage = server_url + filename;
                        advertisement.image = processedImage;
                        advertisement.link = req.body.link;
                        advertisement.title = req.body.title;
                        advertisement.description = req.body.description;

                        await advertisement.save();

                        res.status(200).json({
                            success: true,
                            message: "Advertisement updated successfully",
                            data: advertisement
                        });

                        return;
                    }
                });
            }
        } else {
            advertisement.link = req.body.link;
            advertisement.title = req.body.title;
            advertisement.description = req.body.description;

            await advertisement.save();

            res.status(200).json({
                success: true,
                message: "Advertisement updated successfully",
                data: advertisement
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}

exports.deleteAdvertisement = async (req, res) => {
    try {
        const advertisement = await Advertisement.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!advertisement) {
            res.status(400).json({
                success: false,
                message: "Advertisement not found"
            });
            return;
        }

        const strippedFilename = advertisement.image.replace(server_url, "");
        fs.unlink(`./public/uploads/${strippedFilename}`, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, error: err.message });
            }
        });

        await advertisement.destroy();

        res.status(200).json({
            success: true,
            message: "Advertisement deleted successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}