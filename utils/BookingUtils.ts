import { APIRequestContext, expect } from '@playwright/test';
import { config } from '../config/config';
import { BookingData } from '../utils/booking.types';

export class BookingUtils {

    static async createBooking(
        request: APIRequestContext, bookingData: BookingData) {

        const response = await request.post(
            `${config.apiBaseURL}/booking`,
            {
                data: bookingData,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        );

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        return responseBody.bookingid;
    }
}