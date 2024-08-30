import React, { useState } from "react";
import QRCode from "qrcode.react";
import { Button, Flex, TextInput } from "@mantine/core";

const DynamicQRCodeGenerator = ({ value }) => {
  const [inputValue, setInputValue] = useState(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  
  const downloadQR = () => {
    const canvas = document.getElementById("123");
    const pngUrl = canvas
      // @ts-ignore
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QR-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Flex direction="column" justify="center" align="center" gap={30}>
      <h1 className="no-print">Dynamic QR Code Generator</h1>
      <TextInput
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Custom input"
        className="no-print"
      />

      <div id="qrCodeSection">
        <QRCode value={inputValue || value} id="123" size={200} />
      </div>

      <Button
        onClick={downloadQR}
        style={{ marginTop: 20 }}
        className="no-print"
      >
        Download QR Code
      </Button>
    </Flex>
  );
};

export default DynamicQRCodeGenerator;
