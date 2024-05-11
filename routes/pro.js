const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;
const multer = require("multer");
require("dotenv").config();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Pro = require("../model/prosite");
const Proo = require("../model/proosite");
const Fontsss = require("../model/fontschems");
const Buttonss = require("../model/buttonschema");
const Stylesc = require("../model/styleschema");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const Details = require("../model/Details");
const WORKSPACE_BUCKET = process.env.WORKSPACE_BUCKET;
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
router.post("/prodata", upload.single("file"), async (req, res) => {
  try {
    // const { id } = req.body;
    const { premium, name } = req.body
    const pro = await Pro.findOne();
    // //console.log(user, id);

    const uuidString = uuid();
    const objectName = `${Date.now()}${uuidString}${req.file.originalname}`;
    const result = await s3.send(
      new PutObjectCommand({
        Bucket: WORKSPACE_BUCKET,
        Key: objectName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );
    // const pro = new Pro({
    //   bgimg: [objectName],
    // });
    // const pro = new Pro({ bgimg: [objectName] });
    // await pro.save();
    pro.bgimg.push({ link: objectName, premium, name });
    await pro.save();
    // await Pro.updateOne({ $push: { bgimg: objectName } });
    const link = process.env.PICURL + objectName;
    res.status(200).json({ success: true, link: link });
    // } else {
    //   res.status(404).json({ message: "Data not found", success: false });
    // }
  } catch (e) {
    res.status(409).json({
      message: e.message,
      success: false,
    });
  }
});

router.post("/imageupload", upload.single("file"), async (req, res) => {
  try {
    // const { id } = req.body;
    const pro = await Pro.findOne();
    const { premium, name } = req.body
    // //console.log(user, id);

    const uuidString = uuid();
    const objectName = `${Date.now()}${uuidString}${req.file.originalname}`;
    const result = await s3.send(
      new PutObjectCommand({
        Bucket: WORKSPACE_BUCKET,
        Key: objectName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    // const pro = new Pro({ img: [{ link: objectName, premium: false }] });
    // await pro.save();
    pro.img.push({ link: objectName, premium, name });
    await pro.save();
    // await Pro.updateOne({ $push: { bgimg: objectName } });
    const link = process.env.PICURL + objectName;
    res.status(200).json({ success: true, link: link });
    // } else {
    //   res.status(404).json({ message: "Data not found", success: false });
    // }
  } catch (e) {
    res.status(409).json({
      message: e.message,
      success: false,
    });
  }
})

router.post("/proodata", async (req, res) => {
  try {
    const { lotties, premium } = req.body;
    const pros = new Proo({ lotties: lotties, premium: premium });
    //console.log(user, id);

    //  await pross.updateOne({ _id: id });
    await pros.save();

    res.status(200).json({ success: true, pros });
  } catch (e) {
    res.status(409).json({
      message: e.message,
      success: false,
    });
  }
});

router.get("/getdata", async (req, res) => {
  const prodata = await Pro.findOne();
  try {
    if (!prodata) {
      res.status(404).json({ message: "Data not found", success: false });
    } else {
      const bgimg = [];
      const img = [];

      for (let i = 0; i < prodata.bgimg.length; i++) {
        if (prodata.bgimg[i] !== null) {
          const b = process.env.PICURL + prodata.bgimg[i].link;
          const data = {
            link: b,
            premium: prodata.bgimg[i].premium,
            name: prodata.bgimg[i].name
          }
          bgimg.push(data);
        }
      }

      for (let i = 0; i < prodata.img.length; i++) {
        if (prodata.bgimg[i] !== null) {
          const b = process.env.PICURL + prodata.img[i].link;
          const data = {
            link: b,
            name: prodata.img[i].name,
            premium: prodata.img[i].premium
          }
          img.push(data);
        }
      }
      res.status(200).json({ bgimg, img, success: true });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message, success: false });
  }
});

router.get("/getproodata", async (req, res) => {
  try {
    const data = await Proo.find();
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message, success: false });
  }
});

router.post("/setstyles", async (req, res) => {
  try {
    const { buttoncolor, color, backgroundColor, color1, color2, premium } = req.body;
    const style = new Stylesc({
      buttoncolor: buttoncolor,
      color: color,
      backgroundColor: backgroundColor,
      color1, color2,
      premium: premium == "true" ? true : false
    });
    await style.save();

    res.status(200).json({ success: true, style });
  } catch (e) {
    res.status(409).json({
      message: e.message,
      success: false,
    });
  }
});

router.post("/setbuttons", upload.single("image"), async (req, res) => {
  try {
    const {
      padding,
      shadow,
      borderRadius,
      backgroundColor,
      color,
      borderBottom,
      borderTop,
      borderRight,
      borderLeft,
      borderRadiusTop,
      borderRadiusBottom,
      borderRadiusRight,
      borderRadiusLeft,
      boxShadow,
      fontBold,
      premium,
      gradient,
      imageAlign,
      link, name, fontFamily
    } = req.body;
    const image = req.file

    const uuidString = uuid();
    const objectName = `${Date.now()}${uuidString}${image.originalname}`;
    const result = await s3.send(
      new PutObjectCommand({
        Bucket: WORKSPACE_BUCKET,
        Key: objectName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    const buttons = new Buttonss({
      padding: padding,
      shadow: shadow,
      borderRadius: borderRadius,
      backgroundColor: backgroundColor,
      color: color,
      imageAlign,
      borderTop: borderTop,
      image: objectName,
      borderBottom: borderBottom,
      gradient,
      link, name, fontFamily,
      borderRight: borderRight,
      borderLeft: borderLeft,
      borderRadiusTop: borderRadiusTop,
      borderRadiusBottom: borderRadiusBottom,
      borderRadiusRight: borderRadiusRight,
      borderRadiusLeft: borderRadiusLeft,
      boxShadow: boxShadow,
      fontBold: fontBold,
      premium: premium == "true" ? true : false
    });
    const newbutton = await buttons.save();

    res.status(200).json({ success: true, newbutton });
  } catch (e) {
    res.status(409).json({
      message: e.message,
      success: false,
    });
  }
});

router.post("/setfonts", async (req, res) => {
  try {
    const { link, name, fontFamily, fontSize, fontWeight, fontStyle, textDecoration, lineHeight, letterSpacing, color, premium, textAlign

    } = req.body;
    const fonts = new Fontsss({ link: link, name: name, fontFamily, fontSize, fontWeight, fontStyle, textDecoration, lineHeight, letterSpacing, color, textAlign, premium: premium == "true" ? true : false });
    //console.log(user, id);

    //  await pross.updateOne({ _id: id });
    const newfonts = await fonts.save();

    res.status(200).json({ success: true, newfonts });
  } catch (e) {
    res.status(409).json({
      message: e.message,
      success: false,
    });
  }
});

router.get("/getbuttons", async (req, res) => {
  try {
    const data = await Buttonss.find();
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message, success: false });
  }
});

router.get("/getstyles", async (req, res) => {
  try {
    const data = await Stylesc.find();
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message, success: false });
  }
});

router.get("/getfonts", async (req, res) => {
  try {
    const data = await Fontsss.find();
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message, success: false });
  }
});

router.post("/v1/form", upload.single("doc"), async (req, res) => {
  try {
    const { name, email, phone, message, batch, job } = req.body
    const uuidString = uuid();
    const objectName = `${Date.now()}${uuidString}${req.file.originalname}`;

    if (req.file) {
      const result = await s3.send(
        new PutObjectCommand({
          Bucket: WORKSPACE_BUCKET,
          Key: objectName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );
      const details = new Details({
        name, email, phone, message, batch, doc: objectName, job
      })
      await details.save()
    } else {
      const details = new Details({
        name, email, phone, message, batch, doc: objectName
      })
      await details.save()
    }
    res.status(200).json({ success: true, message: "Details Saved!" })
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!" })
  }
})

module.exports = router;
