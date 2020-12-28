import { population } from './demographic';

const VACCINE_PER_WEEK = 480000 
const VACCINE_PER_DAY = VACCINE_PER_WEEK/7;



const START_VACCINE_DATE_MILLIS = new Date('28 Dec 2020').getTime();

export function isValidAge(age:number): boolean {
    return age != null && age >= 0;
}

export function popAheadOfAge(age: number): number {
    if (!isValidAge(age)) {
        return -1;
    }

    let popAhead = 0;
    for (let iterAge = population.length -1; iterAge >= 0; iterAge--) {
        if(iterAge === age -1) {
            break;
        }

        // console.log(population[iterAge])
        const currentPop = population[iterAge];
        popAhead += currentPop;
    }

    return popAhead;

}

// export function startVaccineDate(age: number) {
//     const popAhead = popAheadOfAge(age);
    
// }
