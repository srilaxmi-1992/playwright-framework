import bookingsJson from '../testdata/bookings.json';

export type BookingData = {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: {
        checkin: string;
        checkout: string;
    };
    additionalneeds: string;
};

type BookingTestData = BookingData & {
    tcId: string;
};

const data = bookingsJson as BookingTestData[];

export class BookingDataUtils {

    static getBooking(tcId: string): BookingData {

        const booking = data.find(d => d.tcId === tcId);

        if (!booking) {
            throw new Error(`No booking data found for ${tcId}`);
        }

        const { tcId:_, ...bookingData } = booking;

        return bookingData;
    }
}