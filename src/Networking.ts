export var apiUrl: string = "http://localhost:8080";
export var user: string | undefined = undefined;

// * Types

type DocumentMeta = {
    archive: string;
    hash: string;
    name: string;
    fileType: string;
    fileSize: number;
    creator: string;
    maintainers: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type Record = {
    _id: string;
    name: string;
    archive: string;
    documents: string[];
    tags: string[];
    creator: string;
    maintainers: string[];
    createdAt: Date;
    updatedAt: Date;
}

type RecordQuery = {
    name?: string,
    includeTags?: string[],
    excludeTags?: string[],
    filterTags?: string[]
};

// * Helper Functions

async function sendRequest(url: string, method: string, body?: any) {
    const init: RequestInit = { method };
    if (body !== undefined) {
        init.headers = { "Content-Type": "application/json"};
        init.body = JSON.stringify(body);
    }

    const response = await fetch(apiUrl + url, init);
    return await response.json();
}

// * Records

export async function findRecords(archive: string, query: RecordQuery): Promise<Record[]> {
    const searchParams = new URLSearchParams(query as any).toString();
    return await sendRequest(`/records/${archive}/?${searchParams}`, "GET");
}

export async function getRecord(archive: string, id: string): Promise<Record> {
    return await sendRequest(`/record/${archive}/${id}`, "GET");
}

// * Documents

export function documentObjectUrl(archive: string, hash: string): string {
    return `${apiUrl}/document/${archive}/${hash}/object`;
}

export async function getDocumentMeta(archive: string, hash: string): Promise<DocumentMeta> {
    return await sendRequest(`/document/${archive}/${hash}/meta`, "GET");
}

export async function uploadDocument(file: File, archive: string, archivist: string) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(apiUrl + "/document", {
        method: "POST",
        body: formData
    });
    return await response.json();
}
