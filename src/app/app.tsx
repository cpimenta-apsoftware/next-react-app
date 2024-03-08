"use client";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [processing, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as FileType);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("Envio realizado com sucesso.");
      })
      .catch(() => {
        message.error("Falha no envio do lote.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <div className="App">
      <>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Selecionar certificado digital</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={processing}
          style={{ marginTop: 16 }}
        >
          {processing ? "Processando" : "Enviar lote de eventos"}
        </Button>
      </>
    </div>
  );
};

export default App;
