class Group {
    constructor(name, leader, members) {
        this.name = name;
        this.leader = leader;
        this.members = members;
    }
}

/** A class that keeps track of groups and group members */
class Groups {
    /**
     * Accepts an array of group objects or if nothing is passed - defaults to an empty array 
     * @param {Array} groups - An array of groups
     */
    constructor(groups = []) {
        this.groups = groups;
    }

    /**
     * Adds a group
     * @param {Group} group 
     */
    addGroup(group) {
        this.groups.push(group);
    }

    /**
     * Removes a group by the name of the group
     * @param {String} groupName 
     */
    removeGroup(groupName) {
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].name.toLowerCase() == groupName.toLowerCase()) {
                this.groups.splice(i, 1);
            }
        }
    }

    /**
     * Adds a member to the specified group 
     * @param {String} groupName 
     * @param {String} memberName 
     */
    addMember(groupName, memberName) {
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].name == groupName) {
                this.groups[i].members.push(memberName);
            }
        }
    }

    /**
     * Removes a member from the specified group
     * @param {String} groupName 
     * @param {String} memberName 
     */
    removeMember(groupName, memberName) {
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].name.toLowerCase() == groupName.toLowerCase()) {
                for (let j = 0; j < this.groups[i].members.length; j++) {
                    if (this.groups[i].members[j].toLowerCase() == memberName.toLowerCase()) {
                        this.groups[i].members.splice(j, 1);
                    }
                }
            }
        }
    }

    /**
     * Prints the groups as formatted in the example below
     */
    get print() {
        for (let i in this.groups) {
            console.log(this.groups[i].name);
            console.log('Leader: ' + this.groups[i].leader);
            console.log(this.groups[i].members.join(' | '));
            console.log('\n');
        }
    }
}



/**
 * Takes an object as an argument and prints the person's first and last name
 * @param {Object} person 
 */
function displayName(person) {
    console.log([person.first, person.last].join(' '));
}



/**
 * Takes an object, array of keys to combine and a destination key. It returns an object with the correct keys combined.
 * @param {Object} person 
 * @param {Array} keyArray 
 * @param {String} destinationKey 
 */
function combineName(person, keyArray, destinationKey) {
    let combinedKeys = [];

    for (let key in keyArray) {
        combinedKeys.push(person[keyArray[key]]);
        delete person[keyArray[key]];
    }

    person[destinationKey] = combinedKeys.join(' ');

    return person;
}



/**
 * Takes an array as an argument and creates an object.
 * @param {Array} array 
 */
function createObject(array) {
    objects = {};

    for (let object in array) {
        objects[parseInt(object) + 1] = {};

        for (let item in array[object]) {
            let destinationKey = array[object][item].key;
            let destinationValue = array[object][item].value;
            objects[parseInt(object) + 1][destinationKey] = destinationValue;
        }
    }

    console.log(objects);
}




/**
 * Question 1 - Write a class that keeps track of groups and group members
 */
const groups = new Groups()
groups.addGroup({
    name: 'Justice League',
    leader: 'Wonder Woman',
    members: ['Batman', 'Superman', 'Spiderman']
})
groups.addGroup({
    name: 'Avengers',
    leader: 'Iron Man',
    members: ['Hulk', 'Thor', 'Captain America']
})
groups.print

console.log('////////////////////////\n');

groups.addMember('Justice League', 'Aqua Man')
groups.print

console.log('////////////////////////\n');

groups.removeGroup('avengers')
groups.print

console.log('////////////////////////\n');

groups.removeMember('Justice League', 'spiderMan')
groups.print




/**
 * Question 2 - Write a function called displayName that takes an object as an argument and prints the person's
 * first and last name. Use object destructuring in function argument. Use template strings when printing the first and last name.
 */
const person = {
    first: 'Elon',
    last: 'Musk',
    twitter: '@elonmusk',
    company: 'Space X'
}
displayName(person)  // Elon Musk




/**
 * Question 3 - Write a function called combineName that takes an object, array of keys to combine and a destination key. It returns an object with the correct keys combined.
 */
combineName(person, ['first', 'last'], 'name')

console.log(person);




/**
 * Question 4 - Write a function called createObject that takes an array as an argument and creates an object. 
 */
const people = [[{
    key: 'name',
    value: 'Elon Musk'
}, {
    key: 'twitter',
    value: '@elonmusk'
}, {
    key: 'company',
    value: 'Space X'
}],
[{
    key: 'name',
    value: 'Tim Cook'
}, {
    key: 'twitter',
    value: '@tim_cook'
}, {
    key: 'company',
    value: 'Apple'
}]]

createObject(people)