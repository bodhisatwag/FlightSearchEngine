export interface Flight {
    number: string;
    amount: string;
    depart: string;
    departCode: string;
    arrive: string;
    arriveCode: string;
    departDateTime: number;
    departDate: string;
    departTime: string;
    arriveDateTime: number;
    arriveDate: string;
    arriveTime: string;
    carrier: string;
};

export interface SearchCriteria {
    originCity: string;
    destinationCity: string;
    departureDate: string;
    returnDate?: string;
    passenger: string;
}

export interface Passenger {
    name: string;
    age: number;
    sex: Sex;
}

export enum Sex {
    Male = 'Male',
    Female = 'Female',
    UnDisclosed = 'UnDisclosed'
}