const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const pro = require("./routes/pro");
const mime = require('mime-types');
require("dotenv").config();
const morgan = require("morgan");
const fs = require('fs');
const path = require('path');
const Pro = require("./model/prosite")
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const { v4: uuid } = require('uuid');

const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api", pro);
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    mongoose.connect(process.env.PRODDB).then(() => {
      console.log("DB is connected");
    });
  } catch (err) {
    console.log(err);
  }
};

connectDB();

const connectApp = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectApp();


async function uploadImagesToS3AndMongoDB(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    const folderName = path.basename(directoryPath);

    const img = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // const arrFile = file.split(" ");
      // const cutFile = arrFile[0]
      // const extension = arrFile[1].split(".")[1]
      // const actualFile = cutFile + (i + 1) + "." + extension

      const filePath = path.join(directoryPath, file);
      // const objectName = `${Date.now()}-${uuid()}-${actualFile}`;
      const objectName = `${Date.now()}-${uuid()}-${file}`;
      console.log(file);
      const tag = file.split("-");
      const tags = [...tag];
      const reversed = tags.reverse();
      // const newArray = reversed.slice(2);
      const arr = reversed.filter(v => v != '' && v != "free" && v != "paid" && v != "premium");
      // const arr = newArray.filter(v => v != '' && v != "free" && v != "paid" && v != "premium");
      console.log(arr, "Arry");
      const objj = {
        name: arr,
        link: objectName,
        premium: true
      };
      img.push(objj);
      const contentType = mime.contentType(path.extname(filePath)) || 'application/octet-stream';
      // Upload file to S3 bucket
      const result = await s3.send(
        new PutObjectCommand({
          Bucket: process.env.WORKSPACE_BUCKET,
          Key: objectName,
          Body: fs.readFileSync(filePath),
          ContentType: contentType,// Adjust content type as per your files
        })
      );
    }


    const pro = await Pro.findById("65eb65c5498f5fe764d817b7")
    // const all = [...pro.img, ...img]
    const all = [...pro.bgimg, ...img]

    // pro.img = all
    pro.bgimg = all
    await pro.save()

    // console.log(all)


    console.log("All images uploaded to S3 and details saved to MongoDB");
  } catch (err) {
    console.log(err)
    console.error("Error uploading images:", err);
  }
}

const directoryPath = "C:\\Users\\fsayu\\OneDrive\\Desktop\\fileupload\\prosite\\more\\bg";
// const directoryPath = "C:\Users\fsayu\OneDrive\Desktop\fileupload\prosite\more\bg";

// uploadImagesToS3AndMongoDB(directoryPath)


const shuffleImage = async () => {
  try {
    const pro = await Pro.findById("65eb65c5498f5fe764d817b7")

    let indexes = Array.from({ length: pro.bgimg.length }, (_, i) => i);

    // Shuffle the indexes array
    shuffle(indexes);

    // Your array of 120 objects
    let arrayOfObjects = pro.bgimg

    // Create a new array to store shuffled objects
    let shuffledArray = [];

    // Rearrange the original array according to shuffled indexes
    indexes.forEach(index => {
      shuffledArray.push(arrayOfObjects[index]);
    });

    console.log(shuffledArray);

    pro.bgimg = shuffledArray

    await pro.save()

  } catch (error) {
    console.log(error)
  }
}

// Function to shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create an array of indexes from 0 to n-1
// Display the shuffled array

// shuffleImage()


const deleteBackGround = async () => {
  try {
    const pro = await Pro.findById("65eb65c5498f5fe764d817b7")
    for (let i = 0; i < pro.bgimg.length; i++) {
      console.log(pro.bgimg[i].link);
      // Create delete command
      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.WORKSPACE_BUCKET,
        Key: pro.bgimg[i].link,
      });
      // Execute the delete command
      await s3.send(deleteCommand);
    }
    pro.bgimg = []
    await pro.save()
    console.log("done")
  } catch (error) {
    console.log(error)
  }
}

// deleteBackGround()