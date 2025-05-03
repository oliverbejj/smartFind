/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { app__routers__document_router__DocumentOut } from '../models/app__routers__document_router__DocumentOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DocumentsService {
    /**
     * List Documents
     * @returns app__routers__document_router__DocumentOut Successful Response
     * @throws ApiError
     */
    public static listDocumentsDocumentsGet(): CancelablePromise<Array<app__routers__document_router__DocumentOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/documents/',
        });
    }
    /**
     * Delete Document
     * @param docId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteDocumentDocumentsDocIdDelete(
        docId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/documents/{doc_id}',
            path: {
                'doc_id': docId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
