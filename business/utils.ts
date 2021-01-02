import { population, popPriority } from './demographic';
import { add } from 'date-fns'

const MILLIS_IN_WEEK = 604800000 
const N_DOSES = 2;

const VACCINES_PER_QUARTER = [
    28269000 / N_DOSES, // q1 2021
    57202000 / N_DOSES, // q2 2021
    53840000 / N_DOSES, // q3 2021
    14806000 / N_DOSES, // q4 2021
    28266000 / N_DOSES, // q1 2022
    20190000 / N_DOSES, // q2 2022
];

// 14 weeks in a quarter
function getVaccineRatioPerWeek(week: number): number {
    // consider first 2 weeks outside of quarter logic
    if (week <= 1) {
        const decemberRatio = 67000;
        return decemberRatio / N_DOSES;
    }
    const weekFrom2020 = week - 2;
    const quarter = Math.trunc(weekFrom2020/14)
    return VACCINES_PER_QUARTER[Math.min(quarter, VACCINES_PER_QUARTER.length - 1)]/14;
}

interface ComputationOptions {
    isUserPriority: boolean;
}

export function computeVaccineDatesV2(age: number, opts?: ComputationOptions): VaccineExpected {
    

    const popOfAge = opts?.isUserPriority ? popPriority : getPopOfAge(age -1);
    const popAhead = popAheadOfAge(age) + (opts?.isUserPriority ? 0 : popPriority);
    let vaccinated = 0;

    let startWeek = null;
    let endWeek = null;

    let week = 0;
    const maxWeek = 14 * (VACCINES_PER_QUARTER.length - 1);

    // population threshold for identifing  start/end week
    // your start week begins after pop ahead of you
    const startWeekTargetPop = opts?.isUserPriority ? 0 : popAhead;
    // your end week considers you as the last person of your age group (worst case scenario)
    const endWeekTargetPop = opts?.isUserPriority ? popPriority : popAhead + popOfAge;

    while (week < maxWeek && (startWeek == null || endWeek == null)){

        // console.log('cycle', week)
        vaccinated += Math.trunc(getVaccineRatioPerWeek(week));

        if(isNaN(vaccinated)) {
            console.error('vaccinated NAN');
            debugger;
        }

        if(startWeek == null && vaccinated >= startWeekTargetPop) {
            startWeek = week;
            // console.log('startWeek set', startWeek)
        }
        
        if(endWeek == null && vaccinated >= endWeekTargetPop) {
            endWeek = week === startWeek ? week + 1 : week;
            // console.log('endWeek set', endWeek, week === startWeek)
        }

        week +=1;
    }

    // console.log('compute age' , age, {vaccinated: vaccinated-getVaccineRatioPerWeek(startWeek), vaccinePower: getVaccineRatioPerWeek(startWeek), popOfAge, popAhead,})

    return {
        startDate: START_VACCINE_DATE_MILLIS + ((startWeek ?? 1 -1)*MILLIS_IN_WEEK),
        endDate: START_VACCINE_DATE_MILLIS + ((endWeek ?? 1)*MILLIS_IN_WEEK)
    }


}


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

function getPopOfAge(age: number) {
    let safeAge = age;
    if (age === null || age < 0) safeAge = 0;
    if (age > population.length -1) safeAge = population.length -1;
    return population[safeAge];
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

        // console.log('add pop with age, ', iterAge +1)

        const currentPop = population[iterAge];
        popAhead += currentPop;
    }

    return popAhead - ALREADY_VACCINATED;

}

export interface VaccineExpected {
    startDate: number;
    endDate: number;
}

