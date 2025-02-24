import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";

// Function to convert JPG/JPEG to PDF
const convertImageToPdf = async (inputPath, outputPath) => {
  const pdfDoc = await PDFDocument.create();
  const imageBytes = fs.readFileSync(inputPath);
  let image;

  if (inputPath.endsWith(".jpg") || inputPath.endsWith(".jpeg")) {
    image = await pdfDoc.embedJpg(imageBytes);
  }

  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
};

// Upload file controller function
export const uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const inputPath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();
  const outputPath = inputPath.replace(ext, ".pdf");

  try {
    if (ext === ".pdf") {
      res.json({ message: "PDF uploaded successfully", path: inputPath });
    } else if (ext === ".jpg" || ext === ".jpeg") {
      await convertImageToPdf(inputPath, outputPath);
      res.json({ message: "Image converted to PDF", path: outputPath });
    } else {
      res.status(400).json({ error: "Unsupported file format" });
    }
  } catch (error) {
    console.error("File processing error:", error);
    res.status(500).json({ error: "Error processing file" });
  }
};
