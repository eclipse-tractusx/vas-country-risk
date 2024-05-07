/********************************************************************************
 * Copyright (c) 2022,2024 BMW Group AG
 * Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  DropArea as DefaultDropArea,
  DropPreview as DefaultDropPreview,
  UploadStatus,
} from "@catena-x/portal-shared-components";

const DropZone = ({
  onChange,
  files,
  acceptFormat,
  maxFilesToUpload,
  maxFileSize,
  DropArea,
  DropStatusHeader,
  DropPreview,
  DropPreviewFile,
  enableDeleteIcon = false,
  enableDeleteOverlay = false,
  deleteOverlayTranslation,
  handleDownload,
  handleDelete,
  errorText,
}) => {
  const [dropped, setDropped] = useState([]);

  const currentFiles = files || dropped;
  const isSingleUpload = maxFilesToUpload === 1;
  const isDisabled = currentFiles.length === maxFilesToUpload;

  const onDropAccepted = useCallback(
    (droppedFiles) => {
      const nextFiles = isSingleUpload
        ? droppedFiles
        : [...dropped, ...droppedFiles];
      setDropped(nextFiles);
      onChange(nextFiles, droppedFiles, undefined);
    },
    [dropped, isSingleUpload, onChange]
  );

  const handleFEDelete = useCallback(
    (deleteIndex, documentId) => {
      const nextFiles = [...currentFiles];
      const deletedFiles = nextFiles.splice(deleteIndex, 1);
      setDropped(nextFiles);
      onChange(nextFiles, undefined, deletedFiles);
      if (handleDelete) {
        handleDelete(documentId);
      }
    },
    [currentFiles, onChange, handleDelete]
  );

  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDropAccepted,
    disabled: isDisabled,
    maxFiles: isSingleUpload ? 0 : maxFilesToUpload,
    accept: acceptFormat,
    multiple: !isSingleUpload,
    maxSize: maxFileSize,
  });

  let DropAreaComponent = DefaultDropArea;
  if (DropArea === false) {
    DropAreaComponent = () => null;
  }

  let DropPreviewComponent = DefaultDropPreview;
  if (DropPreview === false) {
    DropPreviewComponent = () => null;
  }

  const errorObj = fileRejections?.[0]?.errors?.[0];
  const fileTypeError =
    errorObj && fileRejections?.[0]?.errors?.[0].code === "file-invalid-type";
  const errorMessage =
    !isDragActive && errorObj && !fileTypeError && errorText
      ? errorText
      : errorObj?.message;

  const uploadFiles = currentFiles.map((file) => ({
    id: file.id,
    name: file.name,
    size: file.size,
    status: file.status || UploadStatus.NEW,
    progressPercent: file.progressPercent,
  }));

  return (
    <div>
      <div {...getRootProps()}>
        <DropAreaComponent
          disabled={isDisabled}
          error={errorMessage || isDragReject}
          translations={{
            title: "Drag & drop your files here",
            subTitle: "or %browse files% on your computer.",
            errorTitle: "Sorry",
          }}
        >
          <input {...getInputProps()} />
        </DropAreaComponent>
      </div>

      <DropPreviewComponent
        uploadFiles={uploadFiles}
        onDelete={handleFEDelete}
        onDownload={handleDownload}
        DropStatusHeader={DropStatusHeader}
        DropPreviewFile={DropPreviewFile}
        translations={{
          placeholder: "Files being uploaded",
          uploadError: "Error uploading file",
          uploadSuccess: "Success uploading file",
          uploadProgess: "Upload in progess",
        }}
        enableDeleteIcon={enableDeleteIcon}
        enableDeleteOverlay={enableDeleteOverlay}
        deleteOverlayTranslation={deleteOverlayTranslation}
      />
    </div>
  );
};

export default DropZone;
