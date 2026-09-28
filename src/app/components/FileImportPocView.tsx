import React, { useState } from 'react';

interface SelectedFileInfo {
  name: string;
  type: string;
  size: number;
  previewUrl?: string;
}

export const FileImportPocView: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileInfo[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList: SelectedFileInfo[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const previewUrl = f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined;
      fileList.push({
        name: f.name,
        type: f.type || '알 수 없음',
        size: f.size,
        previewUrl,
      });
    }
    setSelectedFiles(fileList);
  };

  return (
    <div className="card poc-card">
      <h3>📷 사진 / 이미지 파일 입력 POC (40항)</h3>
      <p className="poc-desc">
        서버로 전송하지 않고 브라우저 File API를 통해 단어책 사진을 안전하게 읽어 메타데이터와 미리보기를 추출합니다.
      </p>

      <div className="file-input-wrapper">
        <label className="file-input-label">
          <span>사진 선택 (또는 모바일 카메라 촬영)</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {selectedFiles.length > 0 && (
        <div className="poc-file-results">
          <h4>선택된 파일 목록 ({selectedFiles.length}개):</h4>
          <div className="file-cards-grid">
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="file-item-card">
                {file.previewUrl && (
                  <img src={file.previewUrl} alt={file.name} className="img-thumbnail" />
                )}
                <div className="file-item-meta">
                  <p><strong>파일명:</strong> {file.name}</p>
                  <p><strong>MIME 형식:</strong> {file.type}</p>
                  <p><strong>파일 크기:</strong> {(file.size / 1024).toFixed(1)} KB</p>
                  <p className="secure-badge">✓ 서버 업로드 없음 (브라우저 메모리 내부 유지)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
