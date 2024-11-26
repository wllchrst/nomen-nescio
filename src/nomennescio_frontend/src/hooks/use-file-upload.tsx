import { useState } from 'react';

interface UploadedFile {
    file: File;
    progress: number;
    status: 'uploading' | 'completed';
}

export const useFileUpload = (onFilesUploaded: (files: UploadedFile[]) => void) => {
    const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);

    const startUploading = (files: File[]) => {
        // ini utk filter file supaya filenya gk duplicated
        const uniqueFiles = files.filter(
            (file) => !selectedFiles.some((existingFile) => existingFile.file.name === file.name && existingFile.file.size === file.size)
        );

        // init value dari animasi loading
        const uploadFiles = uniqueFiles.map((file) => ({
            file,
            progress: 0,
            status: 'uploading' as 'uploading',
        }));

        setSelectedFiles((prevFiles) => {
            const newFiles = [...prevFiles, ...uploadFiles];
            onFilesUploaded(newFiles); 
            return newFiles;
        });

        // animasi utk load progress
        uploadFiles.reduce((promise, uploadFile, index) => {
            return promise.then(() => {
                return new Promise<void>((resolve) => {
                    simulateUploadProgress(uploadFile, resolve);
                });
            });
        }, Promise.resolve());
    };

    const simulateUploadProgress = (uploadFile: UploadedFile, onComplete: () => void) => {
        const interval = setInterval(() => {
            setSelectedFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                const fileIndex = updatedFiles.findIndex((file) => file.file.name === uploadFile.file.name);
                if (fileIndex !== -1 && updatedFiles[fileIndex].progress < 100) {
                    updatedFiles[fileIndex].progress += 10;
                } else if (fileIndex !== -1) {
                    updatedFiles[fileIndex].status = 'completed';
                    clearInterval(interval);
                    onComplete();
                }
                onFilesUploaded(updatedFiles); 
                return updatedFiles;
            });
        }, 200);
    };

    return { startUploading };
};
