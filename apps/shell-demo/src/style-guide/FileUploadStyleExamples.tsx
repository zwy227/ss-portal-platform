import { useId, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { CloudUpload, Download, FileText, Paperclip, X } from "lucide-react";

const ACCEPT = ".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx";

const UPLOAD_TIP =
  "如已有B/L 提单、DO 文件、商业发票(CI）、eManifest、货代费用担保文件(GOC）等文件，请在此上传";

const CLICK_UPLOAD_HINT = "支持 PDF、图片等常见格式，可上传多个附件";

/** 对齐 tradeDemandDetailUi DETAIL_FORM_UPLOAD_BTN_CLASS */
const UPLOAD_BTN_CLASS = [
  "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md",
  "border border-solid border-gray-border-strong bg-background px-3",
  "text-13 font-medium text-gray-text-4 transition",
  "hover:border-gray-border-emphasis hover:bg-gray-fill-light",
  "focus-visible:outline-none focus-visible:shadow-focus-normal",
].join(" ");

type DemoUploadFile = {
  id: string;
  name: string;
  sizeBytes: number;
  uploadedAt?: string;
};

function formatUploadFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatUploadedAtLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${hh}:${mm}`;
}

function filesToDemoUploads(files: readonly File[], withUploadedAt = true): DemoUploadFile[] {
  return files.map((file) => ({
    id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
    name: file.name,
    sizeBytes: file.size,
    ...(withUploadedAt ? { uploadedAt: new Date().toISOString() } : {}),
  }));
}

/**
 * 样式一：拖拽 + 批量上传
 * 对齐 SSLTLDemo `ContainerVesselDocumentsUploadField`
 *（drayageQuoteOrderContainerVesselForm.tsx）
 */
export function FileUploadDropzoneExample() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<DemoUploadFile[]>([]);

  const appendFiles = (fileList: FileList | readonly File[]) => {
    const next = Array.from(fileList);
    if (!next.length) return;
    setFiles((prev) => [...prev, ...filesToDemoUploads(next)]);
  };

  const handlePickFiles = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) appendFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragOver(false);
    if (e.dataTransfer.files?.length) appendFiles(e.dataTransfer.files);
  };

  const handleRemove = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPT}
        className="sr-only"
        onChange={handleFileChange}
      />
      <div
        role="region"
        aria-label="上传文件"
        className={[
          "flex min-h-[168px] w-full flex-col rounded-card border border-dashed border-solid transition-colors",
          files.length > 0
            ? "gap-4 px-4 py-6 sm:px-5 sm:py-7"
            : "items-center justify-center gap-4 px-6 py-10 text-center",
          isDragOver
            ? "border-brand bg-brand-xlight"
            : "border-gray-border-normal bg-background hover:border-gray-border-emphasis",
        ].join(" ")}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          className={[
            "flex w-full flex-col items-center gap-3",
            files.length > 0 ? "text-center" : "",
          ].join(" ")}
        >
          <div
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gray-fill-normal text-gray-text-4 ring-1 ring-gray-border-normal"
            aria-hidden
          >
            <CloudUpload className="size-7" strokeWidth={1.75} />
          </div>
          <div className="w-full min-w-0 space-y-1.5 px-1 sm:px-2">
            <p className="w-full min-w-0 text-14 font-medium leading-snug text-gray-text-2">
              拖拽或点击选择文件 · 支持多文件同时上传
            </p>
            <p className="w-full min-w-0 break-words text-13-reading text-gray-text-5">{UPLOAD_TIP}</p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg border border-solid border-gray-border-normal bg-background px-5 py-2.5 text-14 font-medium text-gray-text-2 transition-colors hover:bg-gray-fill-normal focus-visible:outline-none focus-visible:shadow-focus-brand"
            onClick={handlePickFiles}
          >
            选择文件
          </button>
        </div>
        {files.length > 0 ? (
          <ul className="w-full space-y-2 border-t border-solid border-gray-border-normal pt-4 text-left">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center gap-3 rounded-card border border-solid border-gray-border-light bg-gray-fill-light px-3 py-2.5"
              >
                <FileText className="size-8 shrink-0 text-gray-text-5" strokeWidth={1.35} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-14 font-medium text-gray-text-2">{file.name}</p>
                  <p className="text-13 text-gray-text-7">
                    {formatUploadFileSize(file.sizeBytes)}
                    {file.uploadedAt ? (
                      <>
                        <span className="mx-1.5" aria-hidden>
                          ·
                        </span>
                        上传于 {formatUploadedAtLabel(file.uploadedAt)}
                      </>
                    ) : null}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex size-8 shrink-0 items-center justify-center rounded-md text-gray-text-7 transition hover:bg-gray-fill-normal hover:text-gray-text-4 focus-visible:outline-none focus-visible:shadow-focus-brand"
                  aria-label={`移除 ${file.name}`}
                  onClick={() => handleRemove(file.id)}
                >
                  <X className="size-4" strokeWidth={2} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function AttachmentFileRow({
  file,
  onRemove,
}: {
  file: DemoUploadFile;
  onRemove: () => void;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-md border border-solid border-gray-border-light bg-gray-fill-light px-3 py-2">
      <FileText className="size-3.5 shrink-0 text-gray-text-5" strokeWidth={1.75} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-13 font-medium text-gray-text-2">{file.name}</p>
        <p className="m-0 text-12 text-gray-text-5">{formatUploadFileSize(file.sizeBytes)}</p>
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 rounded-md p-1 text-gray-text-5 transition hover:bg-background hover:text-gray-text-2"
        aria-label={`下载附件 ${file.name}`}
      >
        <Download className="size-3.5" strokeWidth={2} aria-hidden />
      </button>
      <button
        type="button"
        className="inline-flex shrink-0 rounded-md p-1 text-gray-text-5 transition hover:bg-background hover:text-gray-text-2"
        aria-label={`移除附件 ${file.name}`}
        onClick={onRemove}
      >
        <X className="size-3.5" strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
}

function AttachmentEmptyRow({ ariaLabel }: { ariaLabel: string }) {
  return (
    <div
      className="flex min-w-0 items-center gap-2 rounded-md border border-dashed border-gray-border-normal px-3 py-2"
      aria-label={`${ariaLabel}暂无`}
    >
      <FileText className="size-3.5 shrink-0 text-gray-text-5" strokeWidth={1.75} aria-hidden />
      <p className="m-0 min-w-0 flex-1 truncate text-13 text-gray-text-5">暂无</p>
    </div>
  );
}

/**
 * 样式二：点击上传
 * 对齐 Drayage-SS-APP `MultiAttachmentUploadField`
 *（TransportExecutionSection.tsx）
 */
export function FileUploadClickExample() {
  const labelId = useId();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<DemoUploadFile[]>([]);
  const label = "Buck Slip 承运商版本";
  const hasFiles = files.length > 0;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files;
    if (picked?.length) {
      setFiles((prev) => [...prev, ...filesToDemoUploads(picked, false)]);
    }
    e.target.value = "";
  };

  return (
    <div className="min-w-0 max-w-xl">
      <span id={labelId} className="mb-2 block text-13 font-medium text-gray-text-4">
        {label}
      </span>
      {hasFiles ? (
        <ul className="m-0 flex list-none flex-col gap-1.5 p-0" aria-label={`${label}附件列表`}>
          {files.map((file) => (
            <li key={file.id}>
              <AttachmentFileRow
                file={file}
                onRemove={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
              />
            </li>
          ))}
        </ul>
      ) : (
        <AttachmentEmptyRow ariaLabel={label} />
      )}
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="sr-only"
          multiple
          accept={ACCEPT}
          aria-labelledby={labelId}
          onChange={handleFileChange}
        />
        <button type="button" className={UPLOAD_BTN_CLASS} onClick={() => inputRef.current?.click()}>
          <Paperclip className="size-3.5" strokeWidth={1.75} aria-hidden />
          上传文件
        </button>
        <p className="m-0 min-w-0 portal-detail-form-hint">{CLICK_UPLOAD_HINT}</p>
      </div>
    </div>
  );
}
