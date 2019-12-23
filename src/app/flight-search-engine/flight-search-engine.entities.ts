export interface Flight {
    oneWay: FlightDetails;
    return: FlightDetails;
    carrier: string;
};

export interface FlightDetails {
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
}

export interface SearchCriteria {
    depart: string;
    arrive: string;
    departDate: string;
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