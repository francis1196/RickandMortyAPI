// Interface from characters

export class Character {

    constructor(public id: number, public name: string, public status: string, public species: string,
                public type: string, public gender: string, public image: string, public origin: { name: string },
                public location: { name: string }, public episode: string[]) {}

}
