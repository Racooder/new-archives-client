export var apiUrl: string = "http://racoonia.net:8080";
export var user: string | undefined = undefined;

// * Types

export type Archive = {
    name: string;
    owner: string;
    maintainers: string[];
    createdAt: Date;
    updatedAt: Date;
};

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
};

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
};

type RecordQuery = {
    name?: string,
    includeTags?: string[],
    excludeTags?: string[],
    filterTags?: string[]
};

// * Helper Functions

/**
 * @throws {Error} If the response is an error
 */
async function sendRequest(url: string, method: string, body?: any) {
    const init: RequestInit = { method };
    if (body !== undefined) {
        init.headers = { "Content-Type": "application/json"};
        init.body = JSON.stringify(body);
    }

    const response = await fetch(apiUrl + url, init);

    if (response.status >= 400) {
        window.location.href = `/error/${response.status}`;
        throw new Error(await response.text());
    }

    return await response.json();
}

function populateDates(data: any) {
    data.createdAt = new Date(data.createdAt);
    data.updatedAt = new Date(data.updatedAt);
}

// * Archives

export async function listArchives(): Promise<string[]> {
    return await sendRequest(`/archives`, "GET");
}

export async function getArchive(name: string): Promise<Archive> {
    const data = await sendRequest(`/archive/${name}`, "GET");
    populateDates(data);
    return data;
}

// * Records

export async function findRecords(archive: string, query: RecordQuery): Promise<Record[]> {
    const searchParams = new URLSearchParams(query as any).toString();
    return await sendRequest(`/records/${archive}/?${searchParams}`, "GET");
}

export async function getRecord(archive: string, id: string): Promise<Record> {
    const data = await sendRequest(`/record/${archive}/${id}`, "GET");
    populateDates(data);
    return data;
}

// * Documents

export function documentObjectUrl(archive: string, hash: string): string {
    return `${apiUrl}/document/${archive}/${hash}/object`;
}

export async function getDocumentMeta(archive: string, hash: string): Promise<DocumentMeta> {
    const data = await sendRequest(`/document/${archive}/${hash}/meta`, "GET");
    populateDates(data);
    return data;
}

export async function uploadDocuments(files: FileList, archive: string, archivist: string): Promise<string[]> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append("files", file);
    }
    formData.append("archive", archive);
    formData.append("archivist", archivist);

    const response = await fetch(apiUrl + "/document", {
        method: "POST",
        body: formData
    });
    return await response.json();
}

export async function getUnsorted(archive: string): Promise<string[]> {
    return await sendRequest(`/unsorted/${archive}`, "GET");
}
