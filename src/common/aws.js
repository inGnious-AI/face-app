import AWS from "aws-sdk";

const S3_BUCKET = "continuous-tshirt";
const REGION = "ap-south-1";

AWS.config.update({
    accessKeyId: "YOUR_ACCESS_KEY_ID",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
    region: REGION,
});

const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

export const uploadFileToS3 = (file, customerId, facePart) => {
    const key = `face_app/${customerId}/${facePart}_${Date.now()}_${file.name}`;

    const params = {
        Bucket: S3_BUCKET,
        Key: key,
        Body: file,
        ACL: "public-read",
        ContentType: file.type,
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error("❌ Upload failed:", err);
        } else {
            console.log("✅ Uploaded to:", data.Location);
            alert(`Uploaded to: ${data.Location}`);
        }
    });
};
