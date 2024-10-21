const fs = require("fs");

exports.getImageUrls = (req, res) => {
  fs.readFile("imageUrls.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }

    const urls = data.split("\n").filter((url) => url);
    res.json(urls);
  });
};
