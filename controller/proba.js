const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const POST_BUCKET = process.env.POST_BUCKET;
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// const result = await s3.send(
//     new PutObjectCommand({
//       Bucket: POST_BUCKET,
//       Key: objectName,
//       Body: req.files[i].buffer,
//       ContentType: req.files[i].mimetype,
//     })
//   );
