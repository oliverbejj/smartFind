/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_document_upload__post } from '../models/Body_upload_document_upload__post';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UploadService {
    /**
     * Upload Document
     * @param chatSessionId
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static uploadDocumentUploadPost(
        chatSessionId: string,
        formData: Body_upload_document_upload__post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/upload/',
            query: {
                'chat_session_id': chatSessionId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
