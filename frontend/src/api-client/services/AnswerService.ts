/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerRequest } from '../models/AnswerRequest';
import type { AnswerResponse } from '../models/AnswerResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnswerService {
    /**
     * Generate Answer
     * @param requestBody
     * @returns AnswerResponse Successful Response
     * @throws ApiError
     */
    public static generateAnswerAnswerPost(
        requestBody: AnswerRequest,
    ): CancelablePromise<AnswerResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/answer/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
