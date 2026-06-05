import { expect, test } from "@playwright/test";
import { config } from "../../config/config";
import { BookingUtils } from '../../utils/BookingUtils';
import { JSONUtils } from "../../utils/JSONUtils";

let token: string = ""
test.beforeEach('Login To API Tests Generate Token', async ({ request }) => {

    const response = await request.post(config.apiBaseURL + '/auth', {
        data: {
            "username": "admin",
            "password": "password123"
        },
        headers: {
            "Content-Type": "application/json"
        }
    })

    const responseBody = await response.json()
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    token = responseBody.token
    console.log(`Token is generated ${token}`)

})

test('Create Booking', { tag: '@api' }, async ({ request }) => {

    const { tcId: _, ...bookingData } = JSONUtils.getBooking('TC_API_001');

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
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody.bookingid).toBeTruthy();
    expect(responseBody.booking).toMatchObject(bookingData);
});

test('Get Booking', { tag: '@api' }, async ({ request }) => {

    const { tcId: _, ...bookingData } = JSONUtils.getBooking('TC_API_001');

    const bookingId = await BookingUtils.createBooking(
        request,
        bookingData
    );

    const response = await request.get(
        `${config.apiBaseURL}/booking/${bookingId}`
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject(bookingData);
});

test('Update Booking', { tag: '@api' }, async ({ request }) => {
    const { tcId: _, ...createBookingData } = JSONUtils.getBooking('TC_API_001');
    const { tcId: __, ...updateBookingData } = JSONUtils.getBooking('TC_API_002');

    const bookingId = await BookingUtils.createBooking(
        request,
        createBookingData
    );

    const response = await request.put(
        `${config.apiBaseURL}/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: updateBookingData
        }
    );

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toMatchObject(updateBookingData);
});

test('Delete Booking', { tag: '@api' }, async ({ request }) => {

    const bookingRecord = JSONUtils.getBooking('TC_API_001');
    const { tcId, ...bookingData } = bookingRecord;

    const bookingId = await BookingUtils.createBooking(
        request,
        bookingData
    );

    const response = await request.delete(
        `${config.apiBaseURL}/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            }
        }
    );

    expect(response.status()).toBe(201);

});