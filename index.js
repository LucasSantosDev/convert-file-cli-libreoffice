const { spawn } = require("child_process");

const inputFileName = "file.docx";
const outputDirectory = "output";
const libreofficeProcess = spawn("libreoffice", [
  "--headless",
  "--convert-to",
  "pdf:writer_pdf_Export",
  "--outdir",
  outputDirectory,
  inputFileName,
]);

libreofficeProcess.stdout.on("data", (data) => {
  console.log(`LibreOffice stdout: ${data}`);
});

libreofficeProcess.stderr.on("data", (data) => {
  console.error(`LibreOffice stderr: ${data}`);
});

libreofficeProcess.on("error", (error) => {
  console.error(`Error starting LibreOffice: ${error.message}`);
});

libreofficeProcess.on("close", (code) => {
  if (code === 0) {
    console.log(
      `File converted successfully. Output file: ${outputDirectory}/${inputFileName.replace(
        ".docx",
        ".pdf"
      )}`
    );
  } else {
    console.error(`LibreOffice process exited with code ${code}`);
  }
});
