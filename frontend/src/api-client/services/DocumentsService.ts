/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentOut } from '../models/DocumentOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DocumentsService {
    /**
     * List Documents
     * @returns DocumentOut Successful Response
     * @throws ApiError
     */
    public static listDocumentsDocumentsGet(): CancelablePromise<Array<DocumentOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/documents/',
        });
    }
}
