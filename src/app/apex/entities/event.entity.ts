export class Event {
    name: string;
    title: string;
    description: string;
    slug: string;
    image:string;
    imageAlt: string;
    location: string;
    address: string;
    eventDate: string;
    timing: string;
    about: any[] = [];
    topics: any[] = [];
    speakers: any[] = [];
    color: string;
    rate: number;
    eventStatus: string;
    date: Date;
    new: boolean;
}