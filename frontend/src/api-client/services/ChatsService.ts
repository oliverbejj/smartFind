/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { app__routers__chat_router__DocumentOut } from '../models/app__routers__chat_router__DocumentOut';
import type { ChatSessionCreate } from '../models/ChatSessionCreate';
import type { ChatSessionOut } from '../models/ChatSessionOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatsService {
    /**
     * List Chat Sessions
     * @returns ChatSessionOut Successful Response
     * @throws ApiError
     */
    public static listChatSessionsChatsGet(): CancelablePromise<Array<ChatSessionOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chats/',
        });
    }
    /**
     * Create Chat Session
     * @param requestBody
     * @returns ChatSessionOut Successful Response
     * @throws ApiError
     */
    public static createChatSessionChatsPost(
        requestBody: ChatSessionCreate,
    ): CancelablePromise<ChatSessionOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/chats/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Chat Session
     * @param chatId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteChatSessionChatsChatIdDelete(
        chatId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/chats/{chat_id}',
            path: {
                'chat_id': chatId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Documents For Chat
     * @param chatId
     * @returns app__routers__chat_router__DocumentOut Successful Response
     * @throws ApiError
     */
    public static getDocumentsForChatChatsChatIdDocumentsGet(
        chatId: string,
    ): CancelablePromise<Array<app__routers__chat_router__DocumentOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chats/{chat_id}/documents',
            path: {
                'chat_id': chatId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
