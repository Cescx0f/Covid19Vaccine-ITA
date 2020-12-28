import { population } from './demographic';
import { add } from 'date-fns'

const VACCINE_PER_WEEK = 480000 
const VACCINE_PER_DAY = VACCINE_PER_WEEK/7;


const ALREADY_VACCINATED = 0;


const START_VACCINE_DATE_MILLIS = new Date('28 Dec 2020').getTime();

export function computeTotPop() {
    let tot = 0;
    population.forEach((pop) => {tot += pop} );
    return tot;
}

export function isValidAge(age:number): boolean {
    return age != null && age >= 0;
}

export function popAheadOfAge(age: number): number {
    if (!isValidAge(age)) {
        return -1;
    }

    let popAhead = 0;
    // starting from older population
    for (let iterAge = population.length -1; iterAge >= 0; iterAge--) {
        if(iterAge === age -1) {
            break;
        }

        console.log('add pop with age, ', iterAge +1)

        const currentPop = population[iterAge];
        popAhead += currentPop;
    }

    return popAhead - ALREADY_VACCINATED;

}

export interface VaccineExpected {
    startDate: number;
    endDate: number;
}

export function computeVaccineDates(age: number): VaccineExpected {
    const popAhead = popAheadOfAge(age);

    const weeksAheadOfUser = Math.trunc(popAhead/VACCINE_PER_WEEK);

    const weeksForUserAge = Math.max(Math.trunc(population[age]/VACCINE_PER_WEEK), 1)
    console.log('weeksForUserAge',  weeksForUserAge, age, population[age],);

    const startDate = add(START_VACCINE_DATE_MILLIS, {weeks: weeksAheadOfUser})

    const endDate = add(startDate, {weeks: weeksForUserAge});

    return {
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
    }
    
}
